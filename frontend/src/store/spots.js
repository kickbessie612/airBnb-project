import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';

export const setSpots = spots => {
  return {
    type: SET_SPOTS,
    spots
  };
};

// GET all spots
export const fetchSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  const spots = await res.json();
  dispatch(setSpots(spots));
  return res;
};

// GET a spot by id
export const fetchSpot = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await res.json();
  dispatch(setSpots([spot]));
  return res;
};

// POST create a spot
export const createSpot = spot => async dispatch => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  });

  const data = await res.json();
  dispatch(setSpots([data]));
  return data;
};

// PUT edit a spot
export const updateSpot = spot => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  });

  const data = await res.json();
  dispatch(setSpots([data]));
  return data;
};

const spotsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_SPOTS:
      const spotsObj = {};

      action.spots.forEach(spot => {
        spotsObj[spot.id] = spot;
      });
      newState = { ...newState, ...spotsObj };

      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
