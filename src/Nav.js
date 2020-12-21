import React, { useContext } from "react";
import { Link } from "@reach/router";
import {
  HomeIcon,
  HashtagIcon,
  BookmarkIcon,
  UserIcon,
  LogoutIcon,
} from "./Icons";
import { AuthContext } from "./AuthContext";
import Logout from "./Logout";
import Modal from "./Modal";
import useModal from "./useModal";

const Nav = () => {
  const { isModalVisible, toggleModal } = useModal(false);
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
        <li>
          <Link
            to="logout"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          >
            <LogoutIcon />
            <span>Log out</span>
          </Link>
          {isModalVisible ? (
            <Modal>
              <Logout onClick={toggleModal} />
            </Modal>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
