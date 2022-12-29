import SpotForm from './SpotForm';

const CreateSpotForm = () => {
  const spot = {
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description: '',
    price: ''
  };
  return <SpotForm spot={spot} />;
};

export default CreateSpotForm;
