import { restaurantData } from "../config";
import { useState } from "react";

function filterData(searchInput, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant.title.includes(searchInput)
  );
  return filterData;
}

const Search = () => {
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
    </>
  );
};

export default Search;
