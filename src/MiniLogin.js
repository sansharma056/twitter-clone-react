import React from "react";
import Input from "./Input";
import { Link } from "@reach/router";

const MiniLogin = () => {
  return (
    <form className="mini-login">
      <Input type="email" labelName="Email" />
      <Input type="password" labelName="Password" />
      <Link className="btn" to="/">
        Log in
      </Link>
    </form>
  );
};

export default MiniLogin;
