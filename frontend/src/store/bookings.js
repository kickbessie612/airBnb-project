import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'bookings/setBookings';
// const REMOVE_BOOKING = 'bookings/removeBooking';

export const setBookings = bookings => {
  return {
    type: SET_BOOKINGS,
    bookings
  };
};

// GET all Bookings of current user
export const fetchMyBookings = () => async dispatch => {
  const res = await csrfFetch(`/api/me/bookings`);
  const bookings = await res.json();
  dispatch(setBookings(bookings));
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
