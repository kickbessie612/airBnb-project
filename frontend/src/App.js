// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from './store/session';

import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import SpotIndex from './components/spots/SpotIndex';
import SpotShow from './components/spots/SpotShow';
import CreateSpotForm from './components/spots/CreateSpotForm';
import EditSpotForm from './components/spots/EditSpotForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route exact path='/'>
            <SpotIndex />
          </Route>

          <Route path='/spots/new'>
            <CreateSpotForm />
          </Route>

          <Route exact path='/spots/:spotId'>
            <SpotShow />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
