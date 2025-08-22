import React, { useState, useContext } from "react";
import UserContext from "../../utils/UserContext";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        className="search-btn"
        type="button"
        value="Submit"
        onClick={handleSearch}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={user.name}
        onChange={(e) =>
          setUser({
            name: e.target.value,
            email: user.email,
          })
        }
        // onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
