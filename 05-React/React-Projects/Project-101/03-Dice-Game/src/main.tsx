import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Game from "./components/game/Game.tsx";
import { GameProvider } from "./components/context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/play",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </React.StrictMode>,
);
