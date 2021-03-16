import { useNavigate } from "@reach/router";
import React, { useContext } from "react";
import Input from "./Input";
import useInput from "./useInput";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const MiniLogin = () => {
  const email = useInput("");
  const password = useInput("");
  const authState = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.API_URL}/signin`,
      data: { email: email.state, password: password.state },
    })
      .then((response) => {
        if (response.status == 201) {
          authState.signin(response.data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401)
          navigate(`/login?error=true`);
      });
  };

  return (
    <form className="mini-login" onSubmit={handleForm} noValidate>
      <Input
        type="email"
        labelName="Email"
        value={email.state}
        onChange={email.onChange}
      />
      <Input
        type="password"
        labelName="Password"
        value={password.state}
        onChange={password.onChange}
      />
      <button type="submit" className="btn" to="/">
        Log in
      </button>
    </form>
  );
};

export default MiniLogin;
