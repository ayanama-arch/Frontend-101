import { useState, useContext } from "react";
import image from "../assets/swiggylogo.png";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <>
      <nav className="nav-bar">
        <Link to="/">
          <img className="nav-image" src={image} alt="Logo" />
        </Link>
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
          <li>
            <Link to="/instamart">Instamart</Link>
          </li>
          <li>
            <Link to="/instamart">Cart - {cartItems.length} items</Link>
          </li>
        </ul>
        <h2>{user.name}</h2>
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
