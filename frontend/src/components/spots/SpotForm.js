import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, updateSpot } from '../../store/spots';

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
  const [previewImage, setPreviewImage] = useState(spot.previewImage);
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

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

    const action = spot.id ? updateSpot : createSpot;

    dispatch(action(payload))
      .then(newSpot => history.push(`/spots/${newSpot.id}`))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div>
      <h1 className='introduction'>
        Become a&nbsp;<span>unique</span>&nbsp;host
      </h1>
      <div className='subtitle-container'>
        <h2>Tell us about your place</h2>
      </div>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='Preview Image Url'
          required
          value={previewImage}
          onChange={e => setPreviewImage(e.target.value)}
        />
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
        <button className='blue'>{spot.id ? 'update' : 'create'}</button>
      </form>
    </div>
  );
};

export default SpotForm;
