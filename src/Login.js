import React, { useContext, useEffect, useState } from "react";
import { TwitterLogo } from "./Icons";
import Input from "./Input";
import useInput from "./useInput";
import Modal from "./Modal";
import useModal from "./useModal";
import Signup from "./Signup";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "@reach/router";
import axios from "axios";

const Login = () => {
  const { isModalVisible, toggleModal } = useModal(false);
  const email = useInput("");
  const password = useInput("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage(error.response.data.message);
        setIsErrorMessageVisible(true);
        email.setState("");
        password.setState("");
      });
  };

  useEffect(() => {
    document.title = "Login / Twitter Clone";
  }, []);

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleForm} noValidate>
        <TwitterLogo />
        <h1>Log in to Twitter Clone</h1>
        {isErrorMessageVisible ? (
          <div className="error-wrapper">
            <span className="error">{errorMessage}</span>
          </div>
        ) : null}
        <div className="input-wrapper">
          <Input
            type="email"
            id="email"
            labelName="Email"
            value={email.state}
            onChange={email.onChange}
          />
        </div>
        <div className="input-wrapper">
          <Input
            type="password"
            id="password"
            labelName="Password"
            value={password.state}
            onChange={password.onChange}
          />
        </div>
        <button
          className="btn btn--blue"
          type="submit"
          disabled={!email.state || !password.state}
        >
          Log in
        </button>
        <a onClick={toggleModal}>Sign up for Twitter Clone</a>
        {isModalVisible ? (
          <Modal>
            <Signup onClick={toggleModal} />
          </Modal>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
