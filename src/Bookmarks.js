import React from "react";
import Tweet from "./Tweet";

const Bookmarks = () => {
  const bookmarks = [
    {
      id: 0,
      avatarURL: "",
      name: "John Doe",
      handle: "johndoe",
      content: "foo1\nfoo2\nfoo3\nfoo4",
    },
  ];
  const user = {
    handle: "johndoe",
  };
  // Replace with API call
  return (
    <div className="bookmarks">
      <div className="bookmarks-header">
        <div className="bookmarks-header-content">
          <h2>Bookmarks</h2>
          <p>{`@${user.handle}`}</p>
        </div>
      </div>
      <div className="bookmarks-content">
        {bookmarks ? (
          bookmarks.map((tweet) => <Tweet key={tweet.id} tweetData={tweet} />)
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
