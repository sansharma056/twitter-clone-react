import React, { useContext, useState } from "react";
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
import useAxiosFetch from "./useAxiosFetch";
import { AuthContext } from "./AuthContext";
import DeleteTweet from "./DeleteTweet";
import Modal from "./Modal";
import useModal from "./useModal";

const Tweet = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [tweet, setTweet] = useState({});
  const { avatarURL, imageURL, name, handle, content } = tweet;
  const authState = useContext(AuthContext);
  const { isModalVisible, toggleModal } = useModal(false);

  useAxiosFetch(
    {
      method: "GET",
      url: `${process.env.API_URL}/tweet/${id}`,
      headers: { authorization: authState.token },
    },
    {
      onFetch: function onFetch(response) {
        setTweet(response.data.tweet);
        setLoading(false);
      },
      onError: function onError(error) {
        console.log(error);
      },
      onCancel: function onCancel(error) {
        console.log(error);
      },
    }
  );

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
            <button
              className="btn btn--icon btn--icon--red"
              onClick={toggleModal}
            >
              <DeleteIcon />
            </button>
            {isModalVisible ? (
              <Modal>
                <DeleteTweet onClick={toggleModal} id={id} />
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
