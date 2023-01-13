import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchSpot, deleteSpot } from '../../store/spots';
import BookingIndex from '../bookings/BookingIndex';
import CreateBookingForm from '../bookings/CreateBookingForm';

import './SpotShow.css';

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
    if (!window.confirm('Do you want to delete this spot?')) return;
    await dispatch(deleteSpot(spotId));
    history.push('/');
  };

  if (!spot) {
    return null;
  }

  return (
    <>
      <h1>
        A place to&nbsp;<span>stay</span>
      </h1>
      <h2 className='spot-name-detail-page'>{spot.name}</h2>
      <div className='spot-location'>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <div className='spot-img-container'>
        {spot.SpotImages.map(image => (
          <img src={image.url} key={image.id} />
        ))}
      </div>
      <div className='spot-host'>Hosted by {spot.Owner.firstName}</div>
      <hr />

      <div className='spot-description'>{spot.description}</div>

      {sessionUser && spot.ownerId === sessionUser.id && (
        <>
          <div>
            <Link to={`/spots/${spot.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      <hr />

      {sessionUser && (
        <div>
          <BookingIndex spot={spot} />
        </div>
      )}

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
