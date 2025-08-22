import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createGlobalStyle } from "styled-components";

const GlboalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0%;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
  }
  body{
    font-family: Arial, Helvetica, sans-serif;
    background-color: #323334;
    min-height: 100vh;
    font-size: 1.6rem;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlboalStyle />
    <App />
  </React.StrictMode>
);
