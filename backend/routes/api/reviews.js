const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { ForbiddenError, NotFoundError } = require('../../utils/errors');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { reviewId } = req.params;

  const editReview = await Review.findByPk(reviewId, {
    attributes: [
      'id',
      'userId',
      [sequelize.fn('COUNT', sequelize.col('ReviewImages.id')), 'imageCount']
    ],
    group: ['Review.id'],
    include: { model: ReviewImage, attributes: [], required: false }
  });

  if (!editReview) {
    return next(new NotFoundError('Review'));
  }

  if (editReview.userId !== req.user.id) {
    return next(new ForbiddenError());
  }

  if (editReview.dataValues.imageCount >= 10) {
    const err = new Error(
      'Maximum number of images for this resource was reached'
    );
    err.status = 403;
    return next(err);
  }

  const { url } = req.body;
  const newReviewImage = await ReviewImage.create({
    reviewId: editReview.id,
    url
  });

  res.json(
    await ReviewImage.findByPk(newReviewImage.id, {
      attributes: ['id', 'url']
    })
  );
});

// Edit a Review

router.put(
  '/:reviewId',
  [requireAuth, ...validateReview],
  async (req, res, next) => {
    const { reviewId } = req.params;
    const editReview = await Review.findByPk(reviewId);

    if (!editReview) {
      return next(new NotFoundError('Review'));
    }

    if (editReview.userId !== req.user.id) {
      return next(new ForbiddenError());
    }

    const { review, stars } = req.body;
    editReview.update({ review, stars });

    res.json(editReview);
  }
);

// Delete a Review

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const { reviewId } = req.params;
  const deleteReview = await Review.findByPk(reviewId);

  if (!deleteReview) {
    return next(new NotFoundError('Review'));
  }

  if (deleteReview.userId !== req.user.id) {
    return next(new ForbiddenError());
  }

  deleteReview.destroy();
  res.json({ message: 'Successfully deleted', statusCode: 200 });
});

// Delete a Review Image

router.delete(
  '/:reviewId/images/:imageId',
  requireAuth,
  async (req, res, next) => {
    const { reviewId, imageId } = req.params;

    const deleteReviewImage = await ReviewImage.findOne({
      where: { reviewId, id: imageId },
      include: { model: Review, attributes: ['userId'] }
    });

    if (!deleteReviewImage) {
      return next(new NotFoundError('Review Image'));
    }
    if (deleteReviewImage.Review.userId !== req.user.id) {
      return next(new ForbiddenError());
    }

    deleteReviewImage.destroy();
    res.json({ message: 'Successfully deleted', statusCode: 200 });
  }
);
module.exports = router;
