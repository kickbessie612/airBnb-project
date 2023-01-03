import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'bookings/setBookings';
// const REMOVE_BOOKING = 'bookings/removeBooking';

export const setBookings = bookings => {
  return {
    type: SET_BOOKINGS,
    bookings
  };
};

// GET all bookings of current user
export const fetchMyBookings = () => async dispatch => {
  const res = await csrfFetch(`/api/me/bookings`);
  const bookings = await res.json();
  dispatch(setBookings(bookings));
  return res;
};

// GET all bookings based on a spot id
export const fetchBookings = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await res.json();
  dispatch(setBookings(data.Bookings));
  return res;
};

const bookingsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_BOOKINGS:
      const bookingsObj = {};

      action.bookings.forEach(booking => {
        bookingsObj[booking.id] = booking;
      });
      newState = { ...newState, ...bookingsObj };
      return newState;

    default:
      return state;
  }
};

export default bookingsReducer;
