import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import EditBookingForm from './EditBookingForm';

const MyBookingIndexItem = ({ booking }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Link to={`/spots/${booking.spotId}`}>
        <div className='spot-name'>{booking.Spot.name}</div>
        <div className='spot-location'>
          {booking.Spot.city}, {booking.Spot.country}
        </div>
      </Link>
      <EditBookingForm booking={booking} />
    </>
  );
};

export default MyBookingIndexItem;
