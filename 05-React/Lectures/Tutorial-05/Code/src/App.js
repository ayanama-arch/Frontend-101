import React from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./components/Navbar";
import Body from "./components/Body";
import SearchBar from "./components/SearchBar";

const Footer = () => {
  return <h1>Footer</h1>;
};

const AppLayOut = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Body />
      <Footer />
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayOut />);
