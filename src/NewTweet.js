import React, { useState, useRef } from "react";
import Avatar from "./Avatar";
import { ImageIcon } from "./Icons";

const NewTweet = ({ avatarURL }) => {
  const [tweetTextArea, setTweetTextArea] = useState("");
  const inputFileEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tweetTextArea, inputFileEl.current.files[0]);
  }

  return (
    <div className="new-tweet">
      <div className="new-tweet-l">
        <Avatar src={avatarURL} />
      </div>
      <div className="new-tweet-r">
        <form className="new-tweet-form" onSubmit={handleSubmit}>
          <div className="new-tweet-editor">
            <textarea
              value={tweetTextArea}
              placeholder="What's Happening?"
              onChange={(e) => setTweetTextArea(e.target.value)}
            />
          </div>
          <div className="new-tweet-footer">
            <label htmlFor="file-input" className="btn btn--icon">
              <ImageIcon />
            </label>
            <input id="file-input" type="file" ref={inputFileEl} />
            <button type="submit" className="btn btn--blue">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTweet;
