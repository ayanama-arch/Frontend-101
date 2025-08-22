import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <h2>Logo</h2>

      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(1)}>Forward</button>
      <ul>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>About</li>
        <li>
          <Link to={"products"}>Products</Link>
        </li>
        <li>
          <Link to={"products"}>Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
