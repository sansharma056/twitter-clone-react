import React, { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar";
import {
  CommentIcon,
  HeartIcon,
  RetweetIcon,
  DeleteIcon,
  AddBookmarkIcon,
  HeartSolidIcon,
  RetweetSolidIcon,
} from "./Icons";
import Media from "./Media";
import useAxiosFetch from "./useAxiosFetch";
import { AuthContext } from "./AuthContext";
import DeleteTweet from "./DeleteTweet";
import Modal from "./Modal";
import useModal from "./useModal";
import axios from "axios";

const Tweet = ({ id, onDelete }) => {
  const [state, setState] = useState({
    tweet: {},
    loading: true,
    errorMessage: "",
  });
  const {
    avatarURL,
    imageURL,
    name,
    handle,
    content,
    statuesCount,
    retweetCount,
    favoritesCount,
    retweeted,
    favorited,
  } = state.tweet;
  const authState = useContext(AuthContext);
  const { isModalVisible, toggleModal } = useModal(false);

  const options = useMemo(
    () => ({
      method: "GET",
      url: `${process.env.API_URL}/tweet/${id}`,
      headers: { authorization: authState.token },
    }),
    [id, authState.token]
  );

  const onFetch = useCallback(function onFetch(response) {
    setState({ tweet: response.data.tweet, loading: false, errorMessage: "" });
  }, []);

  const onError = useCallback(function onError(error) {
    if (error.response.status === 404) {
      setState({
        tweet: {},
        loading: false,
        errorMessage: error.response.data.message,
      });
    } else {
      console.log(error);
    }
  }, []);

  const onCancel = useCallback(function onCancel(error) {
    console.log(error);
  }, []);

  useAxiosFetch(options, {
    onFetch,
    onError,
    onCancel,
  });

  const handleFavorite = (event) => {
    if (favorited) {
      axios({
        method: "DELETE",
        url: `${process.env.API_URL}/tweet/${id}/favorite`,
        headers: {
          Authorization: authState.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setState((state) => ({
              ...state,
              tweet: {
                ...state.tweet,
                favorited: false,
                favoritesCount: state.tweet.favoritesCount - 1,
              },
            }));
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios({
        method: "POST",
        url: `${process.env.API_URL}/tweet/${id}/favorite`,
        headers: {
          Authorization: authState.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setState((state) => ({
              ...state,
              tweet: {
                ...state.tweet,
                favorited: true,
                favoritesCount: favoritesCount + 1,
              },
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    event.currentTarget.blur();
  };

  return state.loading ? null : !state.errorMessage ? (
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
          <div className="tweet-action">
            <button className="btn btn--icon">
              <CommentIcon />
            </button>
            <span className="tweet-metric">
              {statuesCount ? statuesCount : null}
            </span>
          </div>
          <div className="tweet-action retweet">
            <button
              className={`btn btn--icon btn--icon--green ${
                retweeted ? "active" : ""
              }`}
            >
              {retweeted ? <RetweetSolidIcon /> : <RetweetIcon />}
            </button>
            <span className="tweet-metric">
              {retweetCount ? retweetCount : null}
            </span>
          </div>
          <div className="tweet-action favorite">
            <button
              className={`btn btn--icon btn--icon--red ${
                favorited ? "active" : ""
              }`}
              onClick={handleFavorite}
            >
              {favorited ? <HeartSolidIcon /> : <HeartIcon />}
            </button>
            <span className={`tweet-metric ${favorited ? "active" : ""}`}>
              {favoritesCount ? favoritesCount : null}
            </span>
          </div>
          <div className="tweet-action">
            <button className="btn btn--icon">
              <AddBookmarkIcon />
            </button>
          </div>
          <div className="tweet-action">
            <button
              className="btn btn--icon btn--icon--red"
              onClick={toggleModal}
            >
              <DeleteIcon />
            </button>
            {isModalVisible ? (
              <Modal>
                <DeleteTweet
                  onClick={toggleModal}
                  id={id}
                  onDelete={onDelete}
                />
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Tweet;
