import { IMG_CDN_URL } from "../constant";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";

const RestaurantCard = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="restaurant-card">
        <img src={IMG_CDN_URL + props?.info?.cloudinaryImageId} alt="logo" />
        <div className="restaurant-card-text">
          <h2>{props?.info?.name}</h2>
          <h4>{props?.info?.cuisines.join(", ")}</h4>
          <h4>{props?.info?.avgRating} stars</h4>
          <h4>
            {user.name} - {user.email}
          </h4>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
