import { useState } from "react";
import image from "../assets/swiggylogo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <>
      <nav className="nav-bar">
        <img className="nav-image" src={image} alt="Logo" />
        <ul className="nav-elements">
          <li>Search</li>
          <li>Offers</li>
          <li>Shop</li>
          <li>Sign in</li>
        </ul>
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)}>LogOut</button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)}>LogIn</button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
