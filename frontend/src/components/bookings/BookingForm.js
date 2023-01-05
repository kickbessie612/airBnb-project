import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBooking } from '../../store/bookings';

const BookingForm = ({ booking, spot }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      startDate,
      endDate
    };

    dispatch(createBooking(payload, spot.id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='date'
        required
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input
        type='date'
        required
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <button>Create</button>
    </form>
  );
};

export default BookingForm;
