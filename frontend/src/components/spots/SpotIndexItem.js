const SpotIndexItem = ({ spot }) => {
  return (
    <>
      <div>{spot.name}</div>
      <div>
        {spot.city}, {spot.country}
      </div>
      <div>{spot.price}</div>
    </>
  );
};

export default SpotIndexItem;
