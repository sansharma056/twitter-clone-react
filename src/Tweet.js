import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar";
import {
  CommentIcon,
  HeartIcon,
  RetweetIcon,
  DeleteIcon,
  AddBookmarkIcon,
} from "./Icons";
import Media from "./Media";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const Tweet = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [tweet, setTweet] = useState({});
  const { avatarURL, imageURL, name, handle, content } = tweet;
  const authState = useContext(AuthContext);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/tweet/${id}`,
      headers: { authorization: authState.token },
    })
      .then((result) => {
        setTweet(result.data.tweet);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, authState.token]);

  return loading ? null : (
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
          {imageURL ? <Media src={imageURL} /> : null}
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
