import React from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar";
import {
  CommentIcon,
  HeartIcon,
  RetweetIcon,
  DeleteIcon,
  AddBookmarkIcon,
} from "./Icons";

const Tweet = ({ tweetData }) => {
  const { avatarURL, name, handle, timestamp, content, imageURL } = tweetData;
  return (
    <div className="tweet">
      <div className="tweet-l">
        <Avatar src={avatarURL} />
      </div>
      <div className="tweet-r">
        <div className="tweet-author">
          <Link to={`/${handle}`}>
            <span className="tweet-author-name">{name}</span>
            <span className="tweet-author-handle">{`@${handle}`}</span>
          </Link>
        </div>
        <div className="tweet-content">
          <p className="tweet-text">{content}</p>
          {imageURL ? <img src={imageURL} alt="Tweet Image" /> : null}
        </div>
        <div className="tweet-actions">
          <div className="btn-wrapper">
            <button className="btn btn--icon">
              <CommentIcon />
            </button>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn--icon btn--icon--green">
              <RetweetIcon />
            </button>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn--icon btn--icon--red">
              <HeartIcon />
            </button>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn--icon">
              <AddBookmarkIcon />
            </button>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn--icon btn--icon--red">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
