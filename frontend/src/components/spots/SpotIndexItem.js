import { Link } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`}>
      <img src={spot.previewImage} />
      <div>{spot.name}</div>
      <div>
        {spot.city}, {spot.country}
      </div>
      <div>{spot.price}</div>
    </Link>
  );
};

export default SpotIndexItem;
