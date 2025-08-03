To be continued...

# RTK Query

## APIs

`createApi()`: It allows to define set of endpoints for API
`fetchBaseQuery()`: wrapper around fetch, use `baseQuery`

- `baseQuery`: It fetch data from the server
- `endpoints`: It can be queries or mutations

## Using RTK query

`Defining api`

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quoteSlice = createApi({
  reducerPath: "quoteApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: () => "/quotes",
    }),
  }),
});

export const { useGetQuotesQuery } = quoteSlice;
```

`Adding to Store`

```js
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import CountReducer from "../features/counter/counterSlice";
import ProductsReducer from "../features/product/productSlice";
import usersSlice from "../features/users/usersSlice";
import countSlice from "../features/memoized/countSlice";
import { quoteSlice } from "../features/quotes/apiSlice";

const store = configureStore({
  reducer: {
    counter: CountReducer,
    products: ProductsReducer,
    users: usersSlice,
    count: countSlice,
    [quoteSlice.reducerPath]: quoteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quoteSlice.middleware),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
```

## Using rtk query in react component

You don't need to write `useSelector` and `useEffect` instead call an action created by RTK Query

```jsx
import React, { useMemo } from "react";
import { useGetQuotesQuery } from "./apiSlice";

const Quote = () => {
  const {
    data: quotes = { quotes: [] }, // Default to an object with an empty array
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuotesQuery();

  const sortedQuotes = useMemo(() => {
    const sortedQuotes = [...quotes.quotes];
    sortedQuotes.sort((a, b) => b.id - a.id);
    console.log("Sorted quotes:", sortedQuotes);
    return sortedQuotes;
  }, [quotes.quotes, isSuccess]); // Include isSuccess in dependencies array if it affects sorting

  if (isLoading) {
    return <h2>Loading quotes</h2>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (!isSuccess || !Array.isArray(quotes.quotes)) {
    return <div>No quotes available</div>;
  }

  console.log("Quotes data:", quotes.quotes);

  return (
    <div className="quotes">
      <h2>Quotes</h2>
      <ul>
        {sortedQuotes.map((quote) => (
          <li key={quote.id} className="quote">
            <dt>
              {quote.text} - {quote.author}
            </dt>
            <dd>{quote.quote.substring(0, 150)}</dd>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quote;
```

## Creating POST with mutation

We define the endpoint using `builder.mutation()`.HTTP method to be a 'POST' request, and we have to provide the body of the request as well.

Since we're using fetchBaseQuery to make the requests, the body field will automatically be JSON-serialized for us.

Like with query endpoints, the API slice automatically generates a React hook for the mutation endpoint - in this case, `useAddNewPostMutation`.

```js
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice;
```

## Using Mutation Hooks in Components

Here you don't need to use dispatch but hook created by rtk query

Mutation hooks return an array with two values:

- The first value is a "trigger function". When called, it makes the request to the server, with whatever argument you provide. This is effectively like a thunk that has already been wrapped to immediately dispatch itself.
- The second value is an object with metadata about the current in-progress request, if any. This includes an isLoading flag to indicate if a request is in-progress.

```js
import React, { useState } from "react";

import { useAddNewPostMutation } from "../api/apiSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };
};
```

## Refetching Post Manually

Using refetch option for `useGetQuotesQuery`

```js
import React, { useMemo } from "react";
import { useGetQuotesQuery } from "./apiSlice";
import { useSelector } from "react-redux";
import SingleQuote from "./SingleQuote";
import AddQuote from "./AddQuote";

const Quote = () => {
  const {
    data: quotes = { quotes: [] }, // Default to an object with an empty array
    isLoading,
    isSuccess,
    isError,
    error,
    // This refetch does refetch data again
    refetch,
  } = useGetQuotesQuery();

  return (
    <div className="quotes">
      <h2>Quotes</h2>
      <button onClick={refetch}>Refetch Quotes</button>
      // Rest of Code
    </div>
  );
};

export default Quote;
```

## Automatic Refreshing With Cache Invalidation

RTK Query lets us define relationships between queries and mutations to enable automatic data refetching, using "tags".
A "tag" is a string or small object that lets you name certain types of data, and invalidate portions of the cache.
When a cache tag is invalidated, RTK Query will automatically refetch the endpoints that were marked with that tag.

Basic tag usage requires adding three pieces of information to our API slice:

- A root tagTypes field in the API slice object, declaring an array of string tag names for data types such as 'Post'
- A providesTags array in query endpoints, listing a set of tags describing the data in that query
- An invalidatesTags array in mutation endpoints, listing a set of tags that are invalidated every time that mutation runs

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quoteSlice = createApi({
  reducerPath: "quoteApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: () => "/quotes",
      providesTags: ["Post"],
    }),
    getQuote: builder.query({
      query: (id) => `/quotes/${id}`,
      providesTags: ["Post"],
    }),
    addNewQuote: builder.mutation({
      query: (initialPost) => ({
        url: "/products/add",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetQuotesQuery, useGetQuoteQuery, useAddNewQuoteMutation } =
  quoteSlice;
```
