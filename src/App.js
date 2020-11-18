import React from "react";
import { render } from "react-dom";

import Main from "./Main";
import Footer from "./Footer";

const App = () => {
  return <Main />;
};

render(<App />, document.getElementById("react-root"));
