import React from "react";
import { Link } from "@reach/router";
import UserCard from "./UserCard";

const WhoToFollow = ({ users }) => {
  return (
    <div className="who-to-follow">
      <div className="who-to-follow-header">
        <h2>Who to follow</h2>
      </div>
      <div className="who-to-follow-content">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="who-to-follow-footer">
        <Link to="#">Show more</Link>
      </div>
    </div>
  );
};

export default WhoToFollow;
