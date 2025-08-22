const RestaurantCard = ({ image, title, type, rating }) => {
  return (
    <div className="card">
      <img src={image} alt="Burger" />
      <h2>{title}</h2>
      <h3>{type.join(", ")}</h3>
      <h4>{rating} stars</h4>
    </div>
  );
};

export default RestaurantCard;
