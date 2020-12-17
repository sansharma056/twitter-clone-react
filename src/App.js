import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import Home from "./Home";
import Login from "./Login";
import MainScreen from "./MainScreen";
import { AuthContext } from "./AuthContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signin = () => {
    setIsAuthenticated(true);
  };

  const signup = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signin,
        signup,
      }}
    >
      <Router>
        <Home path="/" />
        <Login path="login" />
        <MainScreen path="/*" />
      </Router>
    </AuthContext.Provider>
  );
};

render(<App />, document.getElementById("react-root"));
