import { render } from "@testing-library/react";
import Navbar from "../Navbar";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import store from "../../../utils/store";

test("Logo should load on rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </StaticRouter>
  );

  const logo = header.getAllByTestId("logo");
  // console.log(logo);
  expect(logo[0].src).toBe("http://localhost/dummy.png");
});
