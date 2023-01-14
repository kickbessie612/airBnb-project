// backend/route/api/me.js
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking
} = require('../../db/models');

// get the current user
router.get('/', (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json({});
});

// Get all Spots owned by the Current User
router.get('/spots', async (req, res) => {
  const { id } = req.user;
  const spots = await Spot.findAll({
    where: { ownerId: id },
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
        // ,
        // [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
      ]
    },
    // group: ['Spot.id'],
    include: [
      {
        model: SpotImage,
        required: false,
        attributes: ['url', 'preview'],
        where: { preview: true }
      },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
      // ,
      // { model: Review, attributes: [] }
    ]
  });

  res.json(spots);
});

//Get all Reviews of the Current User
router.get('/reviews', async (req, res) => {
  const { id } = req.user;
  const reviews = await Review.findAll({
    where: { userId: id },
    attributes: {
      include: [
        'id',
        'userId',
        'spotId',
        'review',
        'stars',
        'createdAt',
        'updatedAt'
      ]
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      {
        model: Spot,
        attributes: [
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'price',
          'previewImage'
        ]
      },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  });
  res.json(reviews);
});

// Get all of the Current User's Bookings
router.get('/bookings', async (req, res, next) => {
  const { id } = req.user;
  const bookings = await Booking.findAll({
    where: { userId: id },
    attributes: {
      include: [
        'id',
        'spotId',
        'userId',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt'
      ]
    },
    include: [
      {
        model: Spot,
        attributes: [
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'price',
          'previewImage'
        ]
      }
    ]
  });
  res.json(bookings);
});

module.exports = router;
