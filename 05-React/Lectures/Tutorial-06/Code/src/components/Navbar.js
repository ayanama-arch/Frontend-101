import { useState } from "react";
import image from "../assets/swiggylogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <>
      <nav className="nav-bar">
        <img className="nav-image" src={image} alt="Logo" />
        <ul className="nav-elements">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
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
