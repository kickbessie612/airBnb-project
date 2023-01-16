import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  createBooking,
  updateBooking,
  deleteBooking
} from '../../store/bookings';

import './BookingForm.css';

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

  const handleDelete = e => {
    e.preventDefault();
    setErrors([]);

    if (!window.confirm('Do you want to delete this booking?')) return;

    dispatch(deleteBooking(booking.id)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form className='booking-form' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='date-input-container'>
        <input
          onFocus={e => (e.target.type = 'date')}
          onBlur={e => (e.target.type = 'text')}
          type='text'
          required
          value={startDate}
          placeholder='Start Date'
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          onFocus={e => (e.target.type = 'date')}
          onBlur={e => (e.target.type = 'text')}
          type='text'
          required
          value={endDate}
          placeholder='End Date'
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <button>{booking.id ? 'Update' : 'Create'}</button>

        {booking.id && (
          <button className='delete-booking-button' onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
