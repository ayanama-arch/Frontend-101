import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constant";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [menuDetails, setmenuDetails] = useState([]);

  const parameter = useParams();
  restaurantId = parameter.id;

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.93519229&lng=77.62448069999999&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`
    );

    let json = await data.json();

    const menuCard = json?.data?.cards[0]?.card?.card?.info;
    setRestaurantMenu(menuCard);

    const menuItems =
      json?.data?.cards[json.data.cards.length - 1]?.groupedCard?.cardGroupMap
        ?.REGULAR?.cards[2]?.card?.card?.itemCards;
    setmenuDetails(menuItems);
  };

  const { id } = useParams();
  return !menuDetails ? (
    <Shimmer />
  ) : (
    <div className="restaurant-intro">
      <div className="restaurant-menu">
        <h2>Welcome to {restaurantMenu?.name}</h2>
      </div>
      <div className="menu-detail">
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
    </div>
  );
};

export default RestaurantMenu;
