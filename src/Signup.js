import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import useInput from "./useInput";
import { BackIcon, TwitterLogo } from "./Icons";
import axios from "axios";
import validator from "validator";
import { AuthContext } from "./AuthContext";
import { navigate } from "@reach/router";

const Signup = ({ onClick: toggleModal }) => {
  const MAX_STEP = 2;
  const MIN_STEP = 1;
  const [step, updateStep] = useState(MIN_STEP);
  const name = useInput("");
  const email = useInput("");
  const dob = useInput("");
  const password = useInput("");
  const username = useInput("");
  const authState = useContext(AuthContext);

  function next() {
    if (step < MAX_STEP) updateStep(step + 1);
  }

  function prev() {
    if (step > MIN_STEP) updateStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:3000/api/signup",
      data: {
        name: name.state,
        screen_name: username.state,
        email: email.state,
        date_of_birth: dob.state,
        password: password.state,
      },
    }).then((response) => {
      if (response.status == 201) {
        authState.signin(response.data.token);
        navigate("/home");
      }
    });
    toggleModal();
  }

  function renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Create your account</h1>
            <div className="input-wrapper">
              <Input
                type="text"
                id="name"
                labelName="Name"
                value={name.state}
                onChange={name.onChange}
                isInvalid={
                  validator.isEmpty(name.state, { ignore_whitespace: true }) &&
                  name.isTouched
                }
              />
              {validator.isEmpty(name.state, { ignore_whitespace: true }) &&
              name.isTouched ? (
                <div className="error-wrapper">
                  <span className="error">What&apos;s your name?</span>
                </div>
              ) : null}
            </div>
            <div className="input-wrapper">
              <Input
                type="text"
                id="username"
                labelName="Username"
                value={username.state}
                onChange={username.onChange}
                isInvalid={
                  validator.isEmpty(username.state, {
                    ignore_whitespace: true,
                  }) && username.isTouched
                }
              />
              {validator.isEmpty(username.state, { ignore_whitespace: true }) &&
              username.isTouched ? (
                <div className="error-wrapper">
                  <span className="error">What&apos;s your username?</span>
                </div>
              ) : null}
            </div>
            <div className="input-wrapper">
              <Input
                type="email"
                id="email"
                labelName="Email"
                value={email.state}
                onChange={email.onChange}
                isInvalid={!validator.isEmail(email.state) && email.isTouched}
              />
              {!validator.isEmail(email.state) && email.isTouched ? (
                <div className="error-wrapper">
                  <span className="error">Please enter a valid email.</span>
                </div>
              ) : null}
            </div>
            <div className="input-wrapper">
              <Input
                type="date"
                id="dob"
                labelName="Date of Birth"
                value={dob.state}
                onChange={dob.onChange}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1>You&apos;ll need a password</h1>
            <Input
              type="password"
              id="passowrd"
              labelName="Passsword"
              value={password.state}
              onChange={password.onChange}
              isInvalid={
                !validator.isLength(password.state, { min: 8 }) &&
                password.isTouched
              }
            />
            {!validator.isLength(password.state, { min: 8 }) &&
            password.isTouched ? (
              <div className="error-wrapper">
                <span className="error">
                  Your password needs to be at least 8 characters. Please enter
                  a longer one.
                </span>
              </div>
            ) : null}
          </>
        );
    }
  }

  useEffect(() => {
    document.title = "Sign up / Twitter Clone";
  });

  return (
    <div className="signup-form">
      <div className="signup-header">
        <div className="btn-wrapper">
          {step == 1 ? null : (
            <button className="btn btn--icon" role="button" onClick={prev}>
              <BackIcon />
            </button>
          )}
        </div>
        <div>
          <TwitterLogo />
        </div>
        <div className="btn-wrapper jc-fe">
          {step < 2 ? (
            <button
              onClick={next}
              className="btn btn--blue"
              disabled={!name.state || !email.state || !dob.state}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn btn--blue"
              disabled={!name.state || !email.state || !dob.state}
            >
              Finish
            </button>
          )}
        </div>
      </div>
      <div className="signup-form-steps">{renderSwitch(step)}</div>
    </div>
  );
};

export default Signup;
