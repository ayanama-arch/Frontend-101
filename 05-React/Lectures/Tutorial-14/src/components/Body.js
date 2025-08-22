import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { Link } from "react-router-dom";
import useRestaurant from "../../utils/useRestaurant";
import useOnline from "../../utils/useOnline";

const Body = () => {
  const { filteredRestaurants, handleSearch } = useRestaurant();
  const isOnline = useOnline();

  if (!isOnline) {
    return <h1>You are disconnected from internet</h1>;
  }

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
