import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';

const SpotForm = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };

    let newSpot = await dispatch(createSpot(payload));
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Address'
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <input
        type='text'
        placeholder='City'
        required
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input
        type='text'
        placeholder='State'
        required
        value={state}
        onChange={e => setState(e.target.value)}
      />
      <input
        type='text'
        placeholder='Country'
        required
        value={country}
        onChange={e => setCountry(e.target.value)}
      />

      <input
        type='number'
        step='0.0001'
        placeholder='Latitude'
        min='-90'
        max='90'
        required
        value={lat}
        onChange={e => setLat(e.target.value)}
      />
      <input
        type='number'
        step='0.0001'
        placeholder='Longitude'
        min='-180'
        max='180'
        required
        value={lng}
        onChange={e => setLng(e.target.value)}
      />
      <input
        type='text'
        placeholder='Name'
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Description'
        required
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type='number'
        placeholder='Price'
        min='1'
        required
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button>{spot.id ? 'update' : 'create'}</button>
    </form>
  );
};

export default SpotForm;
