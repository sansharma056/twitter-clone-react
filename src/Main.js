import React from "react";
import { Link } from "@reach/router";
import MiniLogin from "./MiniLogin";
import { CommentIcon, SearchIcon, TwitterLogo, UserFriendsIcon } from "./Icons";

const Main = () => {
  return (
    <main className="row">
      <div className="col-1-2 col-1-2-l col jc-c">
        <div className="benefits-panel col as-c">
          <ul>
            <li>
              <SearchIcon />
              <p>Follow your interests.</p>
            </li>
            <li>
              <UserFriendsIcon />
              <p>Hear what people are talking about.</p>
            </li>
            <li>
              <CommentIcon />
              <p>Join the conversation.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-1-2 col-1-2-r col jc-c p-r">
        <MiniLogin />
        <div className="auth-option-panel as-c">
          <TwitterLogo />

          <h1 className="heading">
            See what’s happening in the world right now
          </h1>

          <p>Join Twitter today.</p>

          <Link to="signup" className="btn btn--blue">
            Sign up
          </Link>
          <Link to="login" className="btn">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Main;
