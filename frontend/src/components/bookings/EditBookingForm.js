import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BookingForm from './BookingForm';
import { fetchMyBookings } from '../../store/bookings';

const EditBookingForm = ({ booking }) => {
  const bookingsObj = useSelector(state => state.bookings);

  const editBooking = bookingsObj[booking.id];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (!editBooking) {
    return null;
  }

  return <BookingForm booking={booking} />;
};

export default EditBookingForm;
