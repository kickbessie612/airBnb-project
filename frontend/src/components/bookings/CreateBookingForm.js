import BookingForm from './BookingForm';

const CreateBookingForm = ({ spot }) => {
  const booking = {
    startDate: '',
    endDate: ''
  };
  return <BookingForm booking={booking} spot={spot} />;
};

export default CreateBookingForm;
