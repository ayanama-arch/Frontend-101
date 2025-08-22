import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constant";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { id } = useParams();
  const menuDetails = useRestaurantMenu(id);

  return !menuDetails ? (
    <Shimmer />
  ) : (
    <div className="restaurant-intro menu-detail">
      <h1>Menu Details</h1>
      <div className="menu-card-items">
        {menuDetails?.map((item) => {
          return (
            <div className="menu-card" key={item?.card?.info?.id}>
              <img
                style={{ width: "320px" }}
                src={IMG_CDN_URL + item?.card?.info?.imageId}
                alt=""
              />
              <li>{item?.card?.info?.name}</li>
              <li>{item?.card?.info?.description}</li>
              <li>{item?.card?.info?.ratings?.aggregatedRating.rating}</li>
              <li>{item?.card?.info?.price / 100} Rs</li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
