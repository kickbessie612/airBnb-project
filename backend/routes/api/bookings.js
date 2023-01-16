const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { ForbiddenError, NotFoundError } = require('../../utils/errors');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

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

// Edit a Booking
router.put(
  '/:bookingId',
  [requireAuth, ...validateBooking],
  async (req, res, next) => {
    const { bookingId } = req.params;
    const editBooking = await Booking.findByPk(bookingId, {
      include: { model: Spot }
    });

    if (!editBooking) {
      return next(new NotFoundError('Booking'));
    }

    if (editBooking.userId !== req.user.id) {
      return next(new ForbiddenError());
    }

    // Can't edit a booking that's past the end date
    const bookingEndDate = new Date(editBooking.endDate);
    const today = new Date();

    if (bookingEndDate < today) {
      const err = Error('Validation error');

      err.errors = ["Past bookings can't be modified"];

      err.status = 403;
      return next(err);
    }

    const { startDate, endDate } = req.body;

    const bookingConflicts = await Booking.findAll({
      where: {
        id: {
          [Op.not]: editBooking.id
        },
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } }
        ]
      }
    });

    if (bookingConflicts.length) {
      const err = Error('Validation error');

      err.errors = [
        'Sorry, this spot is already booked for the specified dates'
      ];

      err.status = 403;

      return next(err);
    }

    editBooking.update({ startDate, endDate });

    res.json(editBooking);
  }
);

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const deleteBooking = await Booking.findByPk(bookingId, {
    include: { model: Spot, attributes: ['ownerId'] }
  });

  if (!deleteBooking) {
    return next(new NotFoundError('Booking'));
  }
  // Require proper authorization: Booking must belong to the current user
  // or the Spot must belong to the current user
  if (
    deleteBooking.userId !== req.user.id &&
    deleteBooking.Spot.ownerId !== req.user.id
  ) {
    return next(new ForbiddenError());
  }

  // Bookings that have been started can't be deleted
  const date = new Date(deleteBooking.startDate);
  const today = new Date();

  if (date < today) {
    const err = Error('Validation error');

    err.errors = ["Bookings that have been started can't be deleted"];

    err.status = 403;
    return next(err);
  }

  deleteBooking.destroy();
  res.json({ message: 'Successfully deleted', statusCode: 200 });
});

module.exports = router;
