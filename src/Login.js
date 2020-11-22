import React from "react";
import { TwitterLogo } from "./Icons";
import Input from "./Input";
import useInput from "./useInput";

const Login = () => {
  const email = useInput("");
  const password = useInput("");

  const handleForm = (e) => {
    e.preventDefault();
    if (!email.state || !password.state) {
      throw new Error("Empty Fields");
    }
    console.log(email.state, password.state);
    document.getElementsByTagName("button").disabled = "true";
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleForm} noValidate>
        <TwitterLogo />
        <h1>Log in to Twitter Clone</h1>
        <Input
          type="email"
          id="email"
          labelName="Email"
          value={email.state}
          onChange={email.onChange}
        />
        <Input
          type="password"
          id="password"
          labelName="Password"
          value={password.state}
          onChange={password.onChange}
        />
        <button
          className="btn btn--blue"
          type="submit"
          disabled={!email.state || !password.state}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
