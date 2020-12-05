import { Link } from "@reach/router";
import React from "react";
import Avatar from "./Avatar";

const UserCardFull = ({ user }) => {
  const { avatarURL, name, handle, bio } = user;
  return (
    <div className="user-card-full">
      <div className="user-card-full-l">
        <Avatar src={avatarURL} />
      </div>
      <div className="user-card-full-c">
        <div className="user-card-full-header">
          <div className="user-card-full-author">
            <Link to={`/${handle}`}>
              <span className="user-card-name">{name}</span>
            </Link>
            <span className="user-card-handle">{`@${handle}`}</span>
          </div>
          <button className="btn">Follow</button>
        </div>
        <div className="user-card-full-bio">{bio}</div>
      </div>
    </div>
  );
};

export default UserCardFull;
