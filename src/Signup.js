import React, { useEffect, useState } from "react";
import Input from "./Input";
import useInput from "./useInput";
import { BackIcon, TwitterLogo } from "./Icons";

const Signup = ({ onClick: toggleModal }) => {
  const MAX_STEP = 2;
  const MIN_STEP = 1;
  const [step, updateStep] = useState(MIN_STEP);
  const name = useInput("");
  const email = useInput("");
  const dob = useInput("");
  const password = useInput("");

  function next() {
    if (step < MAX_STEP) updateStep(step + 1);
  }

  function prev() {
    if (step > MIN_STEP) updateStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name.state, email.state, dob.state, password.state);
    toggleModal();
  }

  function renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Create your account</h1>
            <Input
              type="text"
              id="name"
              labelName="Name"
              value={name.state}
              onChange={name.onChange}
            />
            <Input
              type="email"
              id="email"
              labelName="Email"
              value={email.state}
              onChange={email.onChange}
            />
            <Input
              type="date"
              id="dob"
              labelName="Date of Birth"
              value={dob.state}
              onChange={dob.onChange}
            />
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
            />
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
