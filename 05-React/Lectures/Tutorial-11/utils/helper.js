// It makes code Readable
// It makes code maintainable
// It makes code reusable
// It makes code testable

export function filterData(searchInput, restaurants) {
  const filteredData = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filteredData;
}

export const handleSearch = (input) => {
  const data = filterData(input, allRestaurants);
  setFilteredRestaurants(data);
};
