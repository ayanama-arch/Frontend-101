import React from "react";
import ReactDOM from "react-dom/client";

// This is JSX
const Title = <h1>Title of Page</h1>;

const SampleFunc = () => <h2>Sample Function test!!</h2>;

// Functional component

function MyFunc() {
  return (
    <div>
      {Title}
      {SampleFunc()}
      <SampleFunc />
      <h2>Hello world!</h2>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering function
root.render(<MyFunc />);
