import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
import './spots.css';

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (spots.length === 0) {
    return null;
  }

  return (
    <div>
      {spots.map(spot => (
        <SpotIndexItem spot={spot} key={spot.id} />
      ))}
    </div>
  );
};

export default SpotIndex;
