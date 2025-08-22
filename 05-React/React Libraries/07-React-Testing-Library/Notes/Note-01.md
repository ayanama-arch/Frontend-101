# Testing

Testing is used to find bug and errors or validate the functionalities.

## Types of Testing

1. Manual Testing
2. Automatic Testing

## Testing by Developers

- Unit Testing
- Integrated Testing
- E-2-E Testing

## Testing Tool

- Jest Framework
- React Testing Library

## First Test

`Javascript Testing`

```js
// sum.js
export default function sum(a, b) {
  return a + b;
}

// sum.test.js
import sum from "./sum";

test("testing for sum function", () => {
  expect(sum(10, 5)).toBe(215);
});
```

`React Testing`

```js
// App.js
export default function App() {
  return (
    <>
      <h2>Application</h2>
      <p>This is application page</p>
    </>
  );
}

// App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // Checking the text rendered on screen
  const linkElement = screen.getByText(/this is application page/i);
  expect(linkElement).toBeInTheDocument();

  // Checking the text of title of image
  const imageTitle = screen.getByTitle("Image Title");
  expect(imageTitle).toBeInTheDocument();
});
```
