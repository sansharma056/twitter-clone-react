import React, { useEffect } from "react";
import { Link } from "@reach/router";
import MiniLogin from "./MiniLogin";
import { CommentIcon, SearchIcon, TwitterLogo, UserFriendsIcon } from "./Icons";
import Modal from "./Modal";
import useModal from "./useModal";
import Signup from "./Signup";

const Main = () => {
  const { isModalVisible, toggleModal } = useModal(false);

  useEffect(() => {
    document.title = "Twitter Clone";
  });

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

          <button className="btn btn--blue" onClick={toggleModal}>
            Sign up
          </button>
          <Link to="login" className="btn">
            Log in
          </Link>
          {isModalVisible ? (
            <Modal>
              <Signup onClick={toggleModal} />
            </Modal>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Main;
