import RestaurantCard from "./RestaurantCard";
import { restaurantData } from "../config";
import { useState } from "react";

function filterData(searchInput, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant.title.includes(searchInput)
  );
  return filterData;
}

const Body = () => {
  const [searchInput, setSearchInput] = useState("");
  const [restaurants, setRestaurants] = useState(restaurantData);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => {
            setRestaurants(restaurantData);
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            // need to filter the data
            const data = filterData(searchInput, restaurants);
            // update the state
            setRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard {...restaurant} key={restaurant.id} />
        ))}
      </div>
    </>
  );
};

export default Body;
