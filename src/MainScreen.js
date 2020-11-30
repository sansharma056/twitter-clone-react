import React from "react";
import { Router, Link } from "@reach/router";
import UserHome from "./UserHome";
import Nav from "./Nav";
import WhoToFollow from "./WhoToFollow";
import { TwitterLogo } from "./Icons";
import Explore from "./Explore";

const MainScreen = () => {
  return (
    <div className="main-screen">
      <div className="main-screen-sidebar">
        <div className="main-screen-sidebar-header">
          <Link className="btn btn--icon" to="home">
            <TwitterLogo />
          </Link>
          <Nav />
        </div>
      </div>
      <div className="main-screen-content">
        <div>
          <Router className="main-screen-router">
            <UserHome path="home" />
            <Explore path="explore" />
          </Router>
          <div className="main-screen-sidebar-right">
            <WhoToFollow
              users={[
                { id: 1, avatarURL: "", name: "Test Test", handle: "test" },
                { id: 2, avatarURL: "", name: "Test1 Test", handle: "test1" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
