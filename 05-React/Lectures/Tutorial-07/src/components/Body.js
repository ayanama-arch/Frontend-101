import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { Link } from "react-router-dom";

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

  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <SearchBar onSearch={handleSearch} /> {/* Use the SearchBar component */}
      <div className="restaurant-list">
        {filteredRestaurants?.map((restaurant) => (
          <Link to={"restaurant/" + restaurant?.info?.id}>
            <RestaurantCard {...restaurant} key={restaurant?.info?.id} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
