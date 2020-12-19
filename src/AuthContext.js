import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  screenName: null,
  signin: () => {},
  signout: () => {},
});
