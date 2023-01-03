import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../../store/bookings';
import BookingIndexItem from './BookingIndexItem';

const BookingIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => Object.values(state.bookings));
  const myBookings = bookings.filter(
    booking => booking.userId === sessionUser.id
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (myBookings.length === 0) {
    return null;
  }

  return (
    <div>
      {myBookings.map(booking => (
        <BookingIndexItem booking={booking} key={booking.id} />
      ))}
    </div>
  );
};

export default BookingIndex;
