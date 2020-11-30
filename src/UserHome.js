import React, { useEffect } from "react";
import NewTweet from "./NewTweet";
import Separator from "./Separator";
import Tweet from "./Tweet";

const UserHome = () => {
  const tweets = [
    {
      id: 0,
      avatarURL: "",
      name: "John Doe",
      handle: "johndoe",
      content: "foo",
    },
  ];
  // Replace with API call
  useEffect(() => {
    document.title = "Home / Twitter Clone";
  });
  return (
    <div className="user-home">
      <div className="user-home-header">
        <h2>Home</h2>
      </div>
      <NewTweet />
      <Separator />
      {!tweets.length
        ? null
        : tweets.map((tweet) => <Tweet key={tweet.id} tweetData={tweet} />)}
    </div>
  );
};

export default UserHome;
