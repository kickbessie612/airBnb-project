import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
import './SpotIndex.css';

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
    <>
      <h1>
        Find&nbsp;<span>unique</span>&nbsp;homes
      </h1>
      <div className='subtitle-container'>
        <h2>Book your next adventure now</h2>
      </div>
      <div className='spot-index'>
        {spots.map(spot => (
          <SpotIndexItem spot={spot} key={spot.id} />
        ))}
      </div>
    </>
  );
};

export default SpotIndex;
