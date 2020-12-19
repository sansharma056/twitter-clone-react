import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import Home from "./Home";
import Login from "./Login";
import MainScreen from "./MainScreen";
import { AuthContext } from "./AuthContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const signin = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const signout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        signin,
        signout,
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
