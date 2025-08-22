# part-02

## Testing input element

```js
// App.js
export default function App() {
  return (
    <>
      <input
        type="text"
        placeholder="Enter User Name"
        name="username"
        id="userId"
        value="ayan khan"
      />
    </>
  );
}

// App.test.js
test("Testing Input box", () => {
  render(<App />);
  let checkInput = screen.getByRole("textbox");
  expect(checkInput).toBeInTheDocument();
  let checkInputPlaceholder = screen.getByPlaceholderText("Enter User Name");
  expect(checkInputPlaceholder).toBeInTheDocument();

  expect(checkInput).toHaveAttribute("name", "username");
  expect(checkInput).toHaveAttribute("id", "userId");
  expect(checkInput).toHaveAttribute("type", "text");
  expect(checkInput).toHaveAttribute("value", "ayan khan");
});
```

## Test Case Run Options

› Press a to run all tests.
› Press f to run only failed tests.
› Press o to only run tests related to changed files.
› Press q to quit watch mode.
› Press p to filter by a filename regex pattern.
› Press t to filter by a test name regex pattern.
› Press Enter to trigger a test run.

## Test Grouping with Describe

Grouping means divide the testcase with specific types into groups.

Describe is a callback function which contains the test groups.

```js
describe("UI test case group", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/this is application page/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Testing Input box", () => {
    render(<App />);
    let checkInputPlaceholder = screen.getByPlaceholderText("Enter User Name");
    expect(checkInputPlaceholder).toBeInTheDocument();
  });
});
```

## Test OnChange Event with Input Box

```js
// App.test.js
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("on change event testing", () => {
  render(<App />);
  let input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "abc" } });
  expect(input.value).toBe("abc");
});
```

## Test Click Even with Button

```js
// App.js
import { useState } from "react";

export default function App() {
  const [text, setText] = useState("original text");
  return (
    <>
      <h2>{text}</h2>
      <button onClick={() => setText("update text")}>Update</button>
    </>
  );
}

// App.test.js
import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

test("click event test case", () => {
  render(<App />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(screen.getByText("update text")).toBeInTheDocument();
});
```
