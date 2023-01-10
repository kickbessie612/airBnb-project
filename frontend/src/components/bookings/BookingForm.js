import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBooking, updateBooking } from '../../store/bookings';

const BookingForm = ({ booking, spot }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    const payload = { ...booking, startDate, endDate };

    const action = spot ? createBooking : updateBooking;
    const spotId = spot ? spot.id : booking.spotId;
    dispatch(action(payload, spotId)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
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
      <button>{booking.id ? 'update' : 'create'}</button>
    </form>
  );
};

export default BookingForm;
