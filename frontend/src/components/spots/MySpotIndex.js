import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
import './MySpots.css';

const MySpotIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots));
  const mySpots = spots.filter(spot => spot.ownerId === sessionUser.id);

  useEffect(() => {
    dispatch(fetchMySpots());
  }, [dispatch]);

  if (mySpots.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className='introduction'>
        {' '}
        Welcome,&nbsp;
        <span>{sessionUser.firstName}</span>&nbsp;!
      </h1>
      <div className='subtitle-container'>
        <h2>Managing my listing</h2>
      </div>
      <div className='spot-index'>
        {mySpots.map(spot => (
          <SpotIndexItem spot={spot} key={spot.id} />
        ))}
      </div>
    </>
  );
};

export default MySpotIndex;
