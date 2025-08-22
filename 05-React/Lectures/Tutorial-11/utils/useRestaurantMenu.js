import { useState, useEffect } from "react";
import { RES_MENU_URL } from "../src/constant";

const useRestaurantMenu = (id) => {
  const [menuDetails, setmenuDetails] = useState(null);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const data = await fetch(RES_MENU_URL + id);

    let json = await data.json();

    const menuItems =
      json?.data?.cards[json.data.cards.length - 1]?.groupedCard?.cardGroupMap
        ?.REGULAR?.cards[2]?.card?.card?.itemCards;
    setmenuDetails(menuItems);
  };
  return menuDetails;
};

export default useRestaurantMenu;
