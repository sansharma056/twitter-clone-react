import React, { useRef } from "react";
import useInput from "./useInput";
import Avatar from "./Avatar";
import { ImageIcon } from "./Icons";

const NewTweet = ({ avatarURL }) => {
  const tweet = useInput("");
  const inputFileEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tweet, inputFileEl.current.files[0]);
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
              value={tweet.state}
              placeholder="What's Happening?"
              onChange={tweet.onChange}
            />
          </div>
          <div className="new-tweet-footer">
            <label htmlFor="file-input" className="btn btn--icon">
              <ImageIcon />
            </label>
            <input
              id="file-input"
              type="file"
              ref={inputFileEl}
              accept="image/*"
            />
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
