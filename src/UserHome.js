import React, { useContext, useEffect, useState } from "react";
import NewTweet from "./NewTweet";
import Separator from "./Separator";
import Tweet from "./Tweet";
import useAxiosFetch from "./useAxiosFetch";
import { AuthContext } from "./AuthContext";

const UserHome = () => {
  const [tweets, setTweets] = useState([]);
  const authState = useContext(AuthContext);

  useEffect(() => {
    document.title = "Home / Twitter Clone";
  });

  useAxiosFetch(
    {
      method: "GET",
      url: `${process.env.API_URL}/tweet/`,
      headers: { authorization: authState.token },
    },
    {
      onFetch: function onFetch(response) {
        setTweets(response.data.tweets);
      },
      onError: function onError(error) {
        console.log(error);
      },
      onCancel: function (error) {
        console.log(error);
      },
    }
  );
  return (
    <div className="user-home">
      <div className="user-home-header">
        <h2>Home</h2>
      </div>
      <NewTweet />
      <Separator />
      {!tweets.length ? null : tweets.map((id) => <Tweet key={id} id={id} />)}
    </div>
  );
};

export default UserHome;
