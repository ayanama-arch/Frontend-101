# Testing-03

## File and Folder naming convention for testing

The file name will be considered as test files are:-
`file_name.test.js`
`file_name.spec.js`
`file_name.spec.jsx`

You can also put the test files inside the folder `__tests__` they will be consider the test files irrespecitive of their name.

## Before and after hooks

`beforeAll`: runs before all the tests but only once.
`beforeEach`: run before every tests, runs multiple times.

`afterAll`: runs after all the tests but only once.
`afterEach`: run after every tests, runs multiple times.

```js
// beforeAll function before running tests

import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

beforeAll(() => {
  console.log("runs bofore running the tests");
});

test("click event test case", () => {
  render(<App />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(screen.getByText("update text")).toBeInTheDocument();
});
```

## Snapshot Testing

Snapshot testing is a type of testing where we create a snapshot of changed component so that we can match at the time of deployment that whether we changed things are as we wanted or not.

It compares the previous version of the component.

```js
import App from "./App";
import { render } from "@testing-library/react";

test("click event test case", () => {
  const container = render(<App />);
  expect(container).toMatchSnapshot();
});
```

## Important points for testing

`What we should test?`

- Component rendering
- UI elements that we write.
- Functions which we write.
- API testing
- Event Testing
- Props and states
- UI conditionsl testing

`What we should avoid?`

- External UI library code
- Default function of JS and React
- Sometimes we should mock functions rahter than testing it in details.

`Important points`

- Do not write snapshots in starting of the project.
- Run test case after completing your functionality.
- Make a standard for code coverage.
