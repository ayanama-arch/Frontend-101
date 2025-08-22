import { useState, useEffect } from "react";
import { filterData } from "./helper";

const useRestaurant = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.93519229&lng=77.62448069999999"
    );

    const json = await response.json();

    rest = json.data.cards;

    let restaurant = rest.filter((obj) => {
      return (
        obj?.card?.card?.gridElements?.infoWithStyle?.restaurants != undefined
      );
    });

    setFilteredRestaurants(
      restaurant[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setAllRestaurants(
      restaurant[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }
  const handleSearch = (input) => {
    const data = filterData(input, allRestaurants);
    setFilteredRestaurants(data);
  };

  const data = {
    filteredRestaurants,
    allRestaurants,
    handleSearch,
  };

  return data;
};

export default useRestaurant;
