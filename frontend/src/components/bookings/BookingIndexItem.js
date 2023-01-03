const BookingIndexItem = ({ booking }) => {
  return (
    <>
      <div>Start: {booking.startDate}</div>
      <div>End: {booking.endDate}</div>
    </>
  );
};

export default BookingIndexItem;
