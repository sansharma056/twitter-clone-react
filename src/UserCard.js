import React from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar";

const UserCard = ({ user }) => {
  const { avatarURL, name, handle } = user;
  return (
    <div className="user-card">
      <div className="user-card-l">
        <Avatar src={avatarURL} />
      </div>
      <div className="user-card-c">
        <Link to={`/${handle}`}>
          <span className="user-card-name">{name}</span>
        </Link>
        <span className="user-card-handle">{`@${handle}`}</span>
      </div>
      <div className="user-card-r">
        <button className="btn">Follow</button>
      </div>
    </div>
  );
};

export default UserCard;
