import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSpot, deleteSpot } from '../../store/spots';
import BookingIndex from '../bookings/BookingIndex';
import CreateBookingForm from '../bookings/CreateBookingForm';

const SpotShow = () => {
  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotsObj = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  const spot = spotsObj[spotId];

  const handleDelete = async e => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId));
    history.push('/');
  };

  if (!spot) {
    return null;
  }

  return (
    <>
      <h1>{spot.name}</h1>
      <img src={spot.previewImage} />
      <div>{spot.description}</div>
      <div>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      {sessionUser && spot.ownerId === sessionUser.id && (
        <>
          <div>
            <Link to={`/spots/${spot.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      <div>
        <BookingIndex spot={spot} />
      </div>

      {sessionUser && spot.ownerId !== sessionUser.id && (
        <>
          <div>
            <CreateBookingForm spot={spot} />
          </div>
        </>
      )}
    </>
  );
};

export default SpotShow;
