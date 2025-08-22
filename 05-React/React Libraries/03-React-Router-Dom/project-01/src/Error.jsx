import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <>
      <h1>Oops!</h1>
      <p>Unexpected error</p>
      <p>
        <i>{error.statusText}</i>
        <i>{error.data}</i>
      </p>
    </>
  );
};

export default Error;
