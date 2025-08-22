import React, { useEffect, useState } from "react";
import SwiggyData from "../../config/SwiggyData.json";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function filterData(searchInput, restaurants) {
  const filteredData = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filteredData;
}

const Body = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    setFilteredRestaurants(SwiggyData);
    setAllRestaurants(SwiggyData);
  }

  const handleSearch = (input) => {
    const data = filterData(input, allRestaurants);
    setFilteredRestaurants(data);
  };

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <SearchBar onSearch={handleSearch} /> {/* Use the SearchBar component */}
      <div className="restaurant-list">
        {filteredRestaurants?.map((restaurant) => (
          <RestaurantCard {...restaurant} key={restaurant?.info?.id} />
        ))}
      </div>
    </>
  );
};

export default Body;
