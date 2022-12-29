import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpot } from '../../store/spots';

const SpotShow = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotsObj = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  const spot = spotsObj[spotId];

  const editSpot = e => {
    e.preventDefault();
  };

  if (!spot) {
    return null;
  }

  return (
    <>
      <h1>{spot.name}</h1>
      <div>{spot.description}</div>
      <div>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <button
      // onClick={editSpot}
      >
        Edit
      </button>
    </>
  );
};

export default SpotShow;
