import { Link } from 'react-router-dom';
import EditBookingForm from './EditBookingForm';

const MyBookingIndexItem = ({ booking }) => {
  return (
    <>
      <Link to={`/spots/${booking.spotId}`}>
        <div>{booking.Spot.name}</div>
        <div>
          {booking.Spot.city}, {booking.Spot.country}
        </div>
      </Link>
      <EditBookingForm booking={booking} />
    </>
  );
};

export default MyBookingIndexItem;
