// frontend/src/components/SignupFormPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          username,
          password
        })
      ).catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field'
    ]);
  };

  return (
    <div>
      <h1 className='introduction'>
        Start your&nbsp;<span>own</span>&nbsp;experience
      </h1>
      <div className='subtitle-container'>
        <h2>Welcome to Unique Homes</h2>
      </div>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <input
          type='text'
          value={email}
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type='text'
          value={firstName}
          placeholder='First Name'
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <input
          type='text'
          value={lastName}
          placeholder='Last name'
          onChange={e => setLastName(e.target.value)}
          required
        />

        <input
          type='text'
          value={username}
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          type='password'
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button className='blue' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
