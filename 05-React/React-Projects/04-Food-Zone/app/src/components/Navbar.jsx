import styled from "styled-components";

export default function Navbar({ searchFood, filterFoodWithTag }) {
  function handleSearch(e) {
    searchFood(e.target.value);
  }

  function handleTag(e) {
    filterFoodWithTag(e.target.innerText);
  }
  return (
    <Navigation>
      <NavContainer>
        <div className="nav_logo">
          <img src="logo.svg" alt="Logo" />
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleSearch}
        />
      </NavContainer>
      <div className="nav_buttons">
        <Tags onClick={handleTag}>All</Tags>
        <Tags onClick={handleTag}>Breakfast</Tags>
        <Tags onClick={handleTag}>Lunch</Tags>
        <Tags onClick={handleTag}>Dinner</Tags>
      </div>
    </Navigation>
  );
}

const Navigation = styled.nav`
  height: 15vh;
  background-color: #323334;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .nav_buttons {
    display: flex;
    gap: 1.5em;
    justify-content: center;
  }
  @media (0<width<500px) {
    flex-: column;
    margin-bottom: 2em;
    justify-content: center;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .nav_logo {
    cursor: pointer;
  }

  input {
    font-size: 1.6rem;
    width: 15em;
    background-color: inherit;
    color: white;
    border: 2px solid red;
    padding: 0.2em 0.5em;
    border-radius: 5px;
  }
  input:focus {
    border: 2px solid #a80505;
    outline: transparent;
  }
  margin-bottom: 1em;

  @media (0<width<500px) {
    flex-direction: column;
    margin-bottom: 1em;
    justify-content: center;
    align-items: center;
    input {
      margin-top: 0.5em;
    }
  }
`;

const Tags = styled.button`
  background-color: #b62222;
  color: white;
  border: none;
  font-size: 1.6rem;
  padding: 0.23em 0.5em;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c92828;
  }
`;
