import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SpotForm from './SpotForm';
import { fetchSpot } from '../../store/spots';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const spotsObj = useSelector(state => state.spots);

  const spot = spotsObj[spotId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return null;
  }

  return <SpotForm spot={spot} />;
};

export default EditSpotForm;
