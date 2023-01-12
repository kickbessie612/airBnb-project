import { Link } from 'react-router-dom';
import './SpotIndex.css';

const SpotIndexItem = ({ spot }) => {
  return (
    <div className='spot-detail'>
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImage} />
        <div className='spot-name'>{spot.name}</div>
        <div>
          {spot.city}, {spot.country}
        </div>
        <div>${spot.price} per night</div>
      </Link>
    </div>
  );
};

export default SpotIndexItem;
