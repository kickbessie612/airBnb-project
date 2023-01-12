// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className='fas fa-bars' />
      </button>
      {showMenu && (
        <div className='profile-dropdown'>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <hr />
          <div>
            <Link to='/me/spots'>My Spots</Link>
          </div>
          <div>
            <Link to='/me/bookings'>My Bookings</Link>
          </div>
          <div>
            <Link to='/spots/new'>Start a new listing</Link>
          </div>
          <hr />

          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
