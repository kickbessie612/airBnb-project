import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'bookings/setBookings';
// const REMOVE_BOOKINGS = 'bookings/removeBooking';

export const setBookings = bookings => {
  return {
    type: SET_BOOKINGS,
    bookings
  };
};

// GET all bookings
export const fetchBookings = () => async dispatch => {
  const res = await csrfFetch('/api/bookings');
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
