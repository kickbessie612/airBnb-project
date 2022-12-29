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
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setSpots(data));
  return response;
};

// GET a spot by id
export const fetchSpot = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(setSpots([data]));
  return response;
};

// PUT edit a spot
export const updateSpot = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spotId)
  });

  const data = await response.json();
  dispatch(setSpots([data]));
  return response;
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
