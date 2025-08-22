const RestaurantCard = (props) => {
  return (
    <>
      <div className="restaurant-card">
        <img
          src={
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            props?.info?.cloudinaryImageId
          }
          alt="logo"
        />
        <div className="restaurant-card-text">
          <h2>{props?.info?.name}</h2>
          <h4>{props?.info?.cuisines.join(", ")}</h4>
          <h4>{props?.info?.avgRating} stars</h4>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
