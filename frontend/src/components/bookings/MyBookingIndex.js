import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../../store/bookings';
import MyBookingIndexItem from './MyBookingIndexItem';

const MyBookingIndex = () => {
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
        <MyBookingIndexItem booking={booking} key={booking.id} />
      ))}
    </div>
  );
};

export default MyBookingIndex;
