# Concepts

## Installation

```bash
    npm install react-router-dom
```

## Adding a Router

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World!!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Handling Error

```jsx
// error-page.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

// main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // Here error element is added
    errorElement: <ErrorPage />,
  },
]);
```

`NOTE:` _useRouteError_ hook provides error that thrown.

## Nested Routes

```jsx
// main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

// root.jsx
// Outlet is placeholder for element to render according to path
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

## Client Side Routing

It is used to update the url without requesting new document from server.
Instead we can use `<Link>`

```jsx
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
```

## Loading Data (loader)

If we want to load data according to url we use `useLoaderData` hook.
It will keep data and UI in sync

1. We define an async function to fetch data
2. pass that function as loader at particular path
3. useLoaderData inside Component to fetch data when route hits

```jsx
// Defining a function
export const productLoader = async () => {
  const products = await getProducts("https://dummyjson.com/products");
  console.log(products);
  return products;
};

// Putting inside createBrowserRouter at particular path

import { productLoader } from "./features/products/ProductList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "products",
        children: [
          {
            path: "",
            // Here we added loader function
            loader: productLoader,
            element: <ProductsList />,
          },
          {
            path: ":productId",
            element: <Product />,
          },
        ],
      },
    ],
  },
]);

// Use it inside component
import { useLoaderData } from "react-router-dom";
const ProductsList = () => {
  // using useLoaderData
  const { products } = useLoaderData();

  return <div>// Render DAta here</div>;
};
```

## Creating Contacts (action)

When action is called from anywhere it reloads the data in `useLoaderData` and rerenders UI with updated data.

```jsx
// root.jsx
import { useLoaderData, Form } from "react-router-dom";
import { createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
      </div>
    </>
  );
}

// main.jsx
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

## Param passed by loader to loaderFunction

Note the :contactId URL segment. turning it into a "dynamic segment".
Value will be passed as `params.contactId`.

- Loader will pass the parameter id to the loaderFunction

```jsx
// contact.jsx
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  // existing code
}

// main.jsx
import Contact, { loader as contactLoader } from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);
```

## Updating Contacts with FormData (redirect)

The edit route we just created already renders a form. All we need to do to update the record is wire up an action to the route. The form will post to the action and the data will be automatically revalidated.

```jsx
// edit.jsx
import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  // It will redirect page to the url
  return redirect(`/contacts/${params.contactId}`);
}

// main.jsx
import EditContact, { action as editAction } from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
]);
```

## Active Link Styling (NavLink)

When Link is active classname callback function gets arguments isActive, isPending

```jsx
<NavLink to={"/"} className={({ isActive }) => (isActive ? "active" : "")}>
  Home
</NavLink>
```

## Global Pending UI (useNavigation)

useNavigation returns the current navigation state: it can be one of "idle" | "submitting" | "loading".
We can apply css or do some action according to the state of navigation

```jsx
import { useNavigation } from "react-router-dom";

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
```

## Deleting Records

```jsx
// Destroy Action
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function destroyAction({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}

// Action event when hit particular path
import { destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

// Source of Event from component
<Form
  method="post"
  action="destroy"
  onSubmit={(event) => {
    if (!confirm("Please confirm you want to delete this record.")) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>;

// destroy.jsx

// main.jsx
```

## useNavigate

```jsx
// edit.jsx
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
```

## Index Routes

If you want to render a page at index set it's `index:true`
whichever component you want to render set `index:true`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "products",
        children: [
          {
            path: "",
            loader: productLoader,
            element: <ProductsList />,
          },
          {
            path: ":productId",
            element: <Product />,
            loader: PL,
          },
        ],
      },
    ],
  },
]);
```

## useNavigate hook

To navigate backward and forward in url

```js
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(1)}>Forward</button>
    </nav>
  );
};

export default Navbar;
```

## Synchronizing URL to form state

```js
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import getProducts from "./utils/getProducts";

export async function indexLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const products = await getProducts("https://dummyjson.com/products");
  return { products, q };
}

const productList = (param, { products }) => {
  if (param) {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(param.toLowerCase())
    );
    return filteredProducts;
  }
  return products;
};

const Index = () => {
  const { products, q } = useLoaderData();

  const navigation = useNavigation();

  let searchProducts;
  if (products) {
    searchProducts = productList(q, products);
  }

  return (
    <>
      <Form>
        <input type="text" name="q" placeholder="Search" defaultValue={q} />
      </Form>
      <h2>This is home page | Index Page</h2>
      <div
        className={`products ${navigation.state == "loading" ? "loading" : ""}`}
      >
        {searchProducts
          ? searchProducts.map((product) => (
              <ul className="product" key={product.id}>
                <img src={product.thumbnail} alt="" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </ul>
            ))
          : "No items to show"}
      </div>
    </>
  );
};

export default Index;
```

## useSubmit

Submiting form on every change

```js
import { Form, useSubmit } from "react-router-dom";

const Index = () => {
  const submit = useSubmit();

  return (
    <>
      <Form>
        <input
          type="text"
          name="q"
          placeholder="Search"
          defaultValue={q}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        />
      </Form>
    </>
  );
};

export default Index;
```

## Replacing the search stack

If the value of q is null it means it's a first search so don't replace the total history stack if not then replace the stack

```js
import {
  Form,
  useLoaderData,
  useSubmit,
} from "react-router-dom";


const Index = () => {
  const { products, q } = useLoaderData();
  const submit = useSubmit();

  return (
    <>
      <Form>
        <input
          type="text"
          name="q"
          placeholder="Search"
          defaultValue={q}
          onChange={(event) => {
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
          }}
        />
      </Form>

  );
};

export default Index;
```

## Lazy Loading

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const lazyAbout = React.lazy(() => import("./about"));

const router = createBrowserRouter({
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <lazyAbout />
        </Suspense>
      ),
    },
  ],
});

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
```

## JSX Routes

```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);
```
