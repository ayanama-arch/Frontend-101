import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const err = useRouteError();
  return (
    <div>
      <h1>Oops!!</h1>
      <h2>{err.status + " : " + err.statusText}</h2>
      <p>Something went wrong</p>
    </div>
  );
}
