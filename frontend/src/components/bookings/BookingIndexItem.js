import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking } from '../../store/bookings';
import { useState } from 'react';

const BookingIndexItem = ({ booking, spot }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleDelete = async e => {
    e.preventDefault();
    setErrors([]);
    if (!window.confirm('Do you want to delete this booking?')) return;
    dispatch(deleteBooking(booking.id)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        {booking.startDate} to {booking.endDate}
      </div>
      {sessionUser && spot.ownerId === sessionUser.id && (
        <>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </>
  );
};

export default BookingIndexItem;
