import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

test("click event test case", () => {
  render(<App />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(screen.getByText("update text")).toBeInTheDocument();
});
