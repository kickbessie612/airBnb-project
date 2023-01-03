import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';

const MySpotIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots));
  const mySpots = spots.filter(spot => spot.ownerId === sessionUser.id);

  useEffect(() => {
    dispatch(fetchMySpots());
  }, [dispatch]);

  if (spots.length === 0) {
    return null;
  }

  return (
    <div>
      {mySpots.map(spot => (
        <SpotIndexItem spot={spot} key={spot.id} />
      ))}
    </div>
  );
};

export default MySpotIndex;
