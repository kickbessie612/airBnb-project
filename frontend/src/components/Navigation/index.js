// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginForm';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import image from './logo.png';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const loginDemo = () => {
    dispatch(
      sessionActions.loginUser({ credential: 'yuyuani', password: 'password' })
    );
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginForm />
        <Link className='button blue' to='/signup'>
          Sign Up
        </Link>
        <button className='blue' onClick={loginDemo}>
          Demo User
        </button>
      </>
    );
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={image} />
      </Link>
      <div className='nav-links'>
        <NavLink exact to='/'>
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
