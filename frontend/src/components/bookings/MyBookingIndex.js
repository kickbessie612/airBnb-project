import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../../store/bookings';
import MyBookingIndexItem from './MyBookingIndexItem';

import './MyBookingIndex.css';

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
    <>
      <h1 className='introduction'>
        Welcome,&nbsp;
        <span>{sessionUser.firstName}</span>&nbsp;!
      </h1>
      <div className='subtitle-container'>
        <h2>Managing my bookings</h2>
      </div>
      <div className='my-booking-index'>
        {myBookings.map(booking => (
          <MyBookingIndexItem booking={booking} key={booking.id} />
        ))}
      </div>
    </>
  );
};

export default MyBookingIndex;
