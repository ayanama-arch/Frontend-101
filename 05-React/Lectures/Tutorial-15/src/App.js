import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from "./components/Profile";
import Instamart from "./components/Instamart";
import UserContext from "../utils/UserContext";
import { Provider } from "react-redux";
import store from "../utils/store";
import Cart from "./components/Cart";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Lazy loading profile
const About = lazy(() => import("./components/About"));

const AppLayOut = () => {
  const [user, setUser] = useState({
    name: "Ayan",
    email: "ayan@gmail.com",
  });
  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Navbar />
        <Outlet />
        <Footer />
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: <Instamart />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
