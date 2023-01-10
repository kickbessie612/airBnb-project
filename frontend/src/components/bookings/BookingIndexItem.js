import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking } from '../../store/bookings';

const BookingIndexItem = ({ booking, spot }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this booking?')) return;
    await dispatch(deleteBooking(booking.id));
  };

  return (
    <>
      <div>Start: {booking.startDate}</div>
      <div>End: {booking.endDate}</div>
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
