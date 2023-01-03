import { Link } from 'react-router-dom';

const MyBookingIndexItem = ({ booking }) => {
  return (
    <Link to={`/spots/${booking.spotId}`}>
      <div>{booking.Spot.name}</div>
      <div>
        {booking.Spot.city}, {booking.Spot.country}
      </div>
      <div>Start: {booking.startDate}</div>
      <div>End: {booking.endDate}</div>
    </Link>
  );
};

export default MyBookingIndexItem;
