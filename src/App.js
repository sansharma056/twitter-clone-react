import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Login path="login" />
      <Signup path="signup" />
    </Router>
  );
};

render(<App />, document.getElementById("react-root"));
