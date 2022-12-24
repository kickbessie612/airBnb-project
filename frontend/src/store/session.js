import { csrfFetch } from './csrf';

const SET_USER = 'user/setUser';
const REMOVE_USER = 'user/removeUser';

export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const loginUser = (credential, password) => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
  }
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

const sessionReducer = (state = { user: null }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return newState;
  }
};

export default sessionReducer;
