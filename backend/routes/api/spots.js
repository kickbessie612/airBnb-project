const express = require('express');
const router = express.Router();
// const sequelize = require('sequelize');
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { ForbiddenError, NotFoundError } = require('../../utils/errors');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Sequelize } = require('sequelize');

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city').exists({ checkFalsy: true }).withMessage('City is required'),
  check('state').exists({ checkFalsy: true }).withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price').exists({ checkFalsy: true }).withMessage('Price is required'),

  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),

  handleValidationErrors
];

const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Start date is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('End date is required')
    .custom((endDate, { req }) => req.body.startDate < endDate)
    .withMessage('endDate cannot be on or before startDate'),
  handleValidationErrors
];

const validateQuery = [
  check('page')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Page must be greater than or equal to 0'),
  check('size')
    .optional()
    .isFloat({ min: 0, max: 20 })
    .withMessage('Size must be greater than or equal to 0'),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),

  handleValidationErrors
];

// Get all Spots
router.get('/', validateQuery, async (req, res) => {
  const where = {};

  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  if (maxLat) {
    where['lat'] = { [Op.lte]: maxLat };
  }
  if (minLat) {
    where['lat'] = { [Op.gte]: minLat };
  }
  if (maxLng) {
    where['lng'] = { [Op.lte]: maxLng };
  }
  if (minLng) {
    where['lng'] = { [Op.gte]: minLng };
  }
  if (minPrice) {
    where['price'] = { [Op.gte]: minPrice };
  }
  if (maxPrice) {
    where['price'] = { [Op.lte]: maxPrice };
  }

  const pagination = {};
  page = parseInt(page) || 0;
  size = parseInt(size) || 20;

  if (page) {
    pagination['limit'] = size;
    pagination['offset'] = size * (page - 1);
  }

  const spots = await Spot.findAll({
    where,

    attributes: {
      include: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price',
        'previewImage',
        'createdAt',
        'updatedAt'
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
        // [
        //   Sequelize.literal(
        //     `(SELECT AVG(Reviews.stars), Spot.* from Spots JOIN Reviews on spotId = Spot.id)`
        //   ),
        //   'avgRating'
        // ]
      ]
    },
    include: [
      {
        model: SpotImage,
        required: false,
        attributes: ['url', 'preview'],
        where: { preview: true }
      }
      // ,
      // {
      //   model: Review,
      //   attributes: [
      //     // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
      //   ]
      // }
    ],
    ...pagination
  });

  res.json(spots);
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price',
        'createdAt',
        'updatedAt'
        // ,
        // [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
      ]
    },
    // group: ['Spot.id', 'SpotImages.id'],
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: Review
        // , attributes: []
      },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
    ]
  });
  if (!spot) {
    const err = new NotFoundError('Spot');
    return next(err);
  }
  const numReviews = spot.dataValues.Reviews.length;
  spot.dataValues.numReviews = numReviews;
  let count = 0;
  spot.dataValues.Reviews.forEach(review => {
    count += review.stars;
  });
  spot.dataValues.avgStarRating = count / numReviews;
  delete spot.dataValues.Reviews;
  res.json(spot);
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { id } = req.user;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });
  res.status(201).json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const editSpot = await Spot.findByPk(spotId);
  if (!editSpot) {
    return next(new NotFoundError('Spot'));
  }

  if (editSpot.ownerId !== req.user.id) {
    return next(new ForbiddenError());
  }

  const { url, preview } = req.body;
  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview
  });

  if (preview) await editSpot.update({ previewImage: url });

  res.json(
    await SpotImage.findByPk(newSpotImage.id, {
      attributes: ['id', 'url', 'preview']
    })
  );
});

// edit a spot
router.put(
  '/:spotId',
  [requireAuth, ...validateSpot],
  async (req, res, next) => {
    const { spotId } = req.params;
    const editSpot = await Spot.findByPk(spotId);
    if (!editSpot) {
      return next(new NotFoundError('Spot'));
    }
    if (editSpot.ownerId !== req.user.id) {
      return next(new ForbiddenError());
    }
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    } = req.body;

    editSpot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });
    res.json(editSpot);
  }
);

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const deleteSpot = await Spot.findByPk(spotId);
  if (!deleteSpot) {
    return next(new NotFoundError('Spot'));
  }
  if (deleteSpot.ownerId !== req.user.id) {
    return next(new ForbiddenError());
  }
  deleteSpot.destroy();
  res.json({ message: 'Successfully deleted', statusCode: 200 });
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return next(new NotFoundError('Spot'));
  }
  const reviews = await Spot.findByPk(spotId, {
    attributes: [],
    include: [
      {
        model: Review,
        attributes: [
          'id',
          'userId',
          'spotId',
          'review',
          'stars',
          'createdAt',
          'updatedAt'
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          { model: ReviewImage, attributes: ['id', 'url'] }
        ]
      }
    ]
  });
  res.json(reviews);
});

// Create a Review for a Spot based on the Spot's id
router.post(
  '/:spotId/reviews',
  [requireAuth, ...validateReview],
  async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return next(new NotFoundError('Spot'));
    }
    const { id } = req.user;
    const { review, stars } = req.body;
    const existingReview = await Review.findOne({
      where: {
        spotId: spot.id,
        userId: id
      }
    });
    if (existingReview) {
      const err = new Error('User already has a review for this spot');
      err.status = 403;
      return next(err);
    }
    const newReview = await Review.create({
      userId: id,
      spotId,
      review,
      stars
    });
    res.status(201).json(newReview);
  }
);

// Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return next(new NotFoundError('Spot'));
  }

  const bookings = await Spot.findByPk(spotId, {
    attributes: [],
    include: [
      {
        model: Booking,
        attributes: [
          'id',
          'spotId',
          'userId',
          'startDate',
          'endDate',
          'createdAt',
          'updatedAt'
        ],
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
      }
    ]
  });
  res.json(bookings);
});

//Create a Booking from a Spot based on the Spot's id
router.post(
  '/:spotId/bookings',
  [requireAuth, ...validateBooking],
  async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return next(new NotFoundError('Spot'));
    }

    const userId = req.user.id;
    if (spot.ownerId === userId) {
      return next(new ForbiddenError());
    }

    const { startDate, endDate } = req.body;

    //booking conflict error
    const bookingConflicts = await Booking.findAll({
      where: {
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } }
        ]
      }
    });

    if (bookingConflicts.length) {
      const err = new Error(
        'Sorry, this spot is already booked for the specified dates'
      );
      err.status = 403;

      return next(err);
    }

    const newBooking = await Booking.create({
      userId,
      spotId,
      startDate,
      endDate
    });
    res.json(newBooking);
  }
);

// Delete a Spot Image
router.delete(
  '/:spotId/images/:imageId',
  requireAuth,
  async (req, res, next) => {
    const { spotId, imageId } = req.params;

    const deleteSpotImage = await SpotImage.findOne({
      where: { spotId, id: imageId },
      include: { model: Spot, attributes: ['ownerId'] }
    });

    if (!deleteSpotImage) {
      return next(new NotFoundError('Spot Image'));
    }
    if (deleteSpotImage.Spot.ownerId !== req.user.id) {
      return next(new ForbiddenError());
    }

    deleteSpotImage.destroy();
    res.json({ message: 'Successfully deleted', statusCode: 200 });
  }
);

module.exports = router;
