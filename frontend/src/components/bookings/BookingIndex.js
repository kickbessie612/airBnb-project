import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/bookings';
import BookingIndexItem from './BookingIndexItem';

const BookingIndex = ({ spot }) => {
  const dispatch = useDispatch();

  const bookings = useSelector(state => Object.values(state.bookings));

  const spotBookings = bookings.filter(booking => booking.spotId === spot.id);

  useEffect(() => {
    dispatch(fetchBookings(spot.id));
  }, [dispatch]);

  if (spotBookings.length === 0) {
    return null;
  }

  return (
    <>
      <div className='spot-booking-title'>Current Bookings</div>
      <div>
        {spotBookings.map(booking => (
          <BookingIndexItem booking={booking} key={booking.id} spot={spot} />
        ))}
      </div>
    </>
  );
};

export default BookingIndex;
