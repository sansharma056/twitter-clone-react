import React from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar";

const User = ({ user }) => {
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
        <button className="btn">Follow Me</button>
      </div>
    </div>
  );
};

const WhoToFollow = ({ users }) => {
  return (
    <div className="who-to-follow">
      <div className="who-to-follow-header">
        <h2>Who to follow</h2>
      </div>
      <div className="who-to-follow-content">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
      <div className="who-to-follow-footer">
        <Link to="#">Show more</Link>
      </div>
    </div>
  );
};

export default WhoToFollow;
