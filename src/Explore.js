import React, { useEffect } from "react";
import SearchInput from "./SearchInput";
import useInput from "./useInput";
import Tweet from "./Tweet";
import UserCard from "./UserCard";

const Explore = ({ q }) => {
  const searchInput = useInput(q ? q : "");
  console.log(q, searchInput.state);
  const result = {
    tweets: [
      {
        id: 0,
        avatarURL: "",
        name: "John Doe",
        handle: "johndoe",
        content: "foo",
      },
    ],
    users: [
      { id: 1, avatarURL: "", name: "Test Test", handle: "test" },
      { id: 2, avatarURL: "", name: "Test1 Test", handle: "test1" },
    ],
  };

  useEffect(() => {
    document.title = "Explore / Twitter Clone";
  });

  return (
    <div className="explore">
      <div className="explore-header">
        <SearchInput
          onChange={searchInput.onChange}
          value={searchInput.state}
        />
      </div>
      <div className="explore-content">
        {result ? (
          <div className="explore-search-result">
            {result.tweets.map((tweet) => (
              <Tweet key={tweet.id} tweetData={tweet} />
            ))}
            {result.users.map((user) => (
              <UserCard key={user.handle} user={user} />
            ))}
          </div>
        ) : (
          <div className="explore-search-result-alt">
            <h2>Try searching for people, topics, or keywords</h2>
            <p>Your search result will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
