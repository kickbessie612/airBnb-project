import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'bookings/setBookings';
// const REMOVE_BOOKING = 'bookings/removeBooking';

export const setBookings = bookings => {
  return {
    type: SET_BOOKINGS,
    bookings
  };
};

// GET all Bookings for a Spot based on the Spot's id
export const fetchBookings = () => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const bookings = await res.json();
  dispatch(setBookings(bookings));
  return res;
};

const bookingsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    default:
      return state;
  }
};

export default bookingsReducer;
