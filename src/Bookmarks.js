import React, { useContext, useState, useMemo, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import Spinner from "./Spinner";
import Tweet from "./Tweet";
import useAxiosFetch from "./useAxiosFetch";

const Bookmarks = () => {
  const [state, setState] = useState({ bookmarks: [], loading: true });
  const authState = useContext(AuthContext);

  function handleDeleteTweet(deletedId) {
    setState({
      bookmarks: state.bookmarks.filter((id) => id != deletedId),
    });
  }

  const options = useMemo(
    () => ({
      method: "GET",
      url: `${process.env.API_URL}/user/${authState.screenName}`,
      headers: { authorization: authState.token },
    }),
    [authState.token, authState.screenName]
  );

  const onFetch = useCallback(function onFetch(response) {
    if (response.status === 200) {
      setState({ bookmarks: response.data.user.bookmarks, loading: false });
    }
  }, []);

  const onError = useCallback(function onError(error) {
    console.log(error);
  }, []);

  const onCancel = useCallback(function onCancel(error) {
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
    <div className="bookmarks">
      <div className="bookmarks-header">
        <div className="bookmarks-header-content">
          <h2>Bookmarks</h2>
          <p>{`@${authState.screenName}`}</p>
        </div>
      </div>
      <div className="bookmarks-content">
        {state.bookmarks.length ? (
          state.bookmarks.map((tweet) => (
            <Tweet key={tweet} id={tweet} onDelete={handleDeleteTweet} />
          ))
        ) : (
          <div className="bookmarks-content-wrapper">
            <h2>You haven’t added any Tweets to your Bookmarks yet</h2>
            <p>When you do, they’ll show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
