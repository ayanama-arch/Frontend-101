import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./features/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
