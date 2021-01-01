import React, { useContext, useState, useMemo, useCallback } from "react";
import NewTweet from "./NewTweet";
import Separator from "./Separator";
import Tweet from "./Tweet";
import useAxiosFetch from "./useAxiosFetch";
import { AuthContext } from "./AuthContext";
import Spinner from "./Spinner";

const UserHome = () => {
  const [state, setState] = useState({ tweets: [], loading: true });
  const authState = useContext(AuthContext);

  const options = useMemo(
    () => ({
      method: "GET",
      url: `${process.env.API_URL}/tweet/`,
      headers: { authorization: authState.token },
    }),
    [authState.token]
  );

  const onFetch = useCallback(function onFetch(response) {
    setState({ tweets: response.data.tweets, loading: false });
  }, []);

  const onError = useCallback(function onError(error) {
    console.log(error);
  }, []);

  const onCancel = useCallback(function (error) {
    console.log(error);
  }, []);

  useAxiosFetch(options, {
    onFetch,
    onError,
    onCancel,
  });

  return state.loading ? (
    <Spinner />
  ) : (
    <div className="user-home">
      <div className="user-home-header">
        <h2>Home</h2>
      </div>
      <NewTweet />
      <Separator />
      {!state.tweets.length
        ? null
        : state.tweets.map((id) => <Tweet key={id} id={id} />)}
    </div>
  );
};

export default UserHome;
