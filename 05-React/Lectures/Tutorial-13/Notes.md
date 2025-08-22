# Redux

## Redux vs Redux toolkit

We use Redux to manage data layer in large applications.  
Redux is object at the end of the day.

## Writing in Store (Reducer)

We can't directly change the store we have to dispatch the action and it will call the function(reducer) which will eventually change the slice of store.  
The function which modifies the store called Reducer.  

## Reading from Store (Selector)

We use a selector for selecting the slice of a store which will update our card.  
Selector is a hook at the end of the day.  
Selector is also known as subscribing the store.

## Installing Redux

```js
    npm i @reduxjs/toolkit //It will install core library

    npm i react-redux // It is the bridge between react and redux
```

## Using Redux in our App

```js
    // store.js
    // Creating Store with ConfigureStore
    import { configureStore } from "@reduxjs/toolkit";

    const store = configureStore({});

    export default store; 

    // Using Store with Provider

    import { Provider } from "react-redux";
    import store from "../utils/store";

    import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

    // Lazy loading profile
    const About = lazy(() => import("./components/About"));

    const AppLayOut = () => {
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
```

## Creating Store Slice

```js
    // cartSlice.js

    import { createSlice } from "@reduxjs/toolkit";

    const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
        state.items.push(action.payload);
        },
        removeItem: (state, action) => {
        state.items.pop();
        },
        clearCart: (state) => {
        state.items = [];
        },
    },
    });

    export const {addItem, removeItem, clearItem} = cartSlice.actions;
    export default cartSlice.reducer;

    // store.js
    // Connecting Store slice to store
    import { configureStore } from "@reduxjs/toolkit";
    import cartSlice from "./cartSlice";

    const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
    });

    export default store;

    // navbar.js
    // Subscribing our store
    
    import { useSelector } from "react-redux";

    const Navbar = () => {
    const cartItems = useSelector((store) => store.cart.items);
    return (
        <>
        <nav className="nav-bar">
            <Link to="/instamart">Cart - {cartItems.length} items</Link>
        </nav>
    </>
  );
};

export default Navbar;
```

## Adding items(dispatching) from menu card

```js
// RestaurantMenu.js
// Adding items into cart from menu using dispatch
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";

const RestaurantMenu = () => {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem("Grapes"));
  };

  return (
    <div>
      <h1>Menu Details</h1>
          return (
              <button onClick={handleAddItem}>Add +</button>
            </div>
          );
    </div>
  );
};

export default RestaurantMenu;
```

## Thunks in Redux

## Middleware in Redux

## Redux devtool
