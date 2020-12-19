import React, { useContext } from "react";
import { Link } from "@reach/router";
import { HomeIcon, HashtagIcon, BookmarkIcon, UserIcon } from "./Icons";
import { AuthContext } from "./AuthContext";

const Nav = () => {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active" } : {};
  };

  const authState = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home" getProps={isActive}>
            <HomeIcon />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" getProps={isActive}>
            <HashtagIcon />
            <span>Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/bookmarks" getProps={isActive}>
            <BookmarkIcon />
            <span>Bookmarks</span>
          </Link>
        </li>
        <li>
          <Link to={`/${authState.screenName}`} getProps={isActive}>
            <UserIcon />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
