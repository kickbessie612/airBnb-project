import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import EditBookingForm from './EditBookingForm';
import { deleteBooking } from '../../store/bookings';

const MyBookingIndexItem = ({ booking }) => {
  const dispatch = useDispatch();

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this booking?')) return;
    await dispatch(deleteBooking(booking.id));
  };

  return (
    <>
      <Link to={`/spots/${booking.spotId}`}>
        <div className='spot-name'>{booking.Spot.name}</div>
        <div className='spot-location'>
          {booking.Spot.city}, {booking.Spot.country}
        </div>
      </Link>
      <EditBookingForm booking={booking} />
      <button className='delete-booking-button' onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default MyBookingIndexItem;
