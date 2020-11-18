import React from "react";
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
    <form className="login-form" onSubmit={handleForm}>
      <h1>Log in to Twitter Clone</h1>
      <Input
        type="email"
        id="email"
        labelName="Email"
        value={email.value}
        onChange={email.onChange}
      />
      <Input
        type="password"
        id="password"
        labelName="Password"
        value={password.value}
        onChange={password.onChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
