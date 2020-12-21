import React, { useContext } from "react";
import { TwitterLogo } from "./Icons";
import { AuthContext } from "./AuthContext";
import { navigate } from "@reach/router";

const Logout = ({ onClick: toggleModal }) => {
  const authState = useContext(AuthContext);

  return (
    <div className="logout">
      <div className="logout-header">
        <TwitterLogo />
      </div>
      <div className="logout-content">
        <h2>Log out of Twitter Clone?</h2>
        <span>You can always log back in at any time.</span>
      </div>
      <div className="logout-footer">
        <button className="btn" onClick={toggleModal}>
          Cancel
        </button>
        <button
          className="btn btn--blue"
          onClick={() => {
            authState.signout();
            toggleModal();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Logout;
