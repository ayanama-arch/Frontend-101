# React Context

When you want some data all accross the component,
It is like a useState for whold application or central data.

## Why not with global variable

Because react do not tracking the global variable but  it track the context

## Creating Context

```js
    // UserContext.js
    // Creating UserContext

    import { createContext } from "react";

    const UserContext = createContext({
    user: {
        name: "Dummy Name",
        email: "dummy@gmail.com",
    },
    });

    export default UserContext;

    // Navbar.js
    // Using UserContext

    import { useState, useContext } from "react";
    import UserContext from "../../utils/UserContext";

    const Navbar = () => {
    const { user } = useContext(UserContext);
    return (
        <h2>{user.name}</h2>
    );
    };
    export default Navbar;
```

## Context in Class based component

```js
    // Using userContext inside class based components
    import UserContext from "../../utils/UserContext";

    class Profile extends React.Component {
       

        render() {
            return (
            <div>
                <h1>Profile Class Based Component</h1>
                <UserContext.Consumer>
                {({ user }) => (
                    <h3>
                    {user.name} - {user.email}
                    </h3>
                )}
                </UserContext.Consumer>
            </div>
            );
        }
    }

    export default Profile;
```

## Override the default value fo context

```js
    import React, { lazy, Suspense, useState } from "react";
    import ReactDOM from "react-dom/client"

    const AppLayOut = () => {
    const [user, setUser] = useState({
        name: "Ayan",
        email: "ayan@gmail.com",
    });
    return (
        // UserContext.Provider is used to pass the modified value
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Navbar />
        <Outlet />
        <Footer />
        </UserContext.Provider>
    );
    };
```
