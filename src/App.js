import dotenv from "dotenv";

import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import Home from "./Home";
import Login from "./Login";
import MainScreen from "./MainScreen";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";

dotenv.config();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [screenName, setScreenName] = useState(
    localStorage.getItem("screenName")
  );

  const signin = (token) => {
    const payload = jwt_decode(token);

    setIsAuthenticated(true);
    setToken(`Bearer ${token}`);
    setScreenName(payload.screenName);

    localStorage.setItem("token", `Bearer ${token}`);
    localStorage.setItem("screenName", payload.screenName);
  };

  const signout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setScreenName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("screenName");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        screenName,
        signin,
        signout,
      }}
    >
      <Router>
        <Home path="/" />
        <Login path="login/*" />
        <MainScreen path="/*" />
      </Router>
    </AuthContext.Provider>
  );
};

render(<App />, document.getElementById("react-root"));
