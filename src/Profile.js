import { Link, useParams } from "@reach/router";
import React, { useCallback, useContext, useState, useMemo } from "react";
import {
  BackIcon,
  BalloonIcon,
  CalendarIcon,
  LinkIcon,
  MapMarkerIcon,
} from "./Icons";
import Avatar from "./Avatar";
import Banner from "./Banner";
import Tweet from "./Tweet";
import Modal from "./Modal";
import EditProfile from "./EditProfile";
import useModal from "./useModal";
import Spinner from "./Spinner";
import { AuthContext } from "./AuthContext";
import useAxiosFetch from "./useAxiosFetch";
import axios from "axios";

const Profile = () => {
  const { isModalVisible, toggleModal } = useModal(false);
  const authState = useContext(AuthContext);
  const params = useParams();
  const [state, setState] = useState({
    user: {},
    loading: true,
    errorMessage: "",
  });

  function handleFollow() {
    if (state.user.following) {
      axios({
        method: "DELETE",
        url: `${process.env.API_URL}/user/${params.screenName}/follow`,
        headers: {
          Authorization: authState.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setState({
              ...state,
              user: {
                ...state.user,
                following: false,
                followersCount: state.user.followersCount - 1,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios({
        method: "POST",
        url: `${process.env.API_URL}/user/${params.screenName}/follow`,
        headers: {
          Authorization: authState.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setState({
              ...state,
              user: {
                ...state.user,
                following: true,
                followersCount: state.user.followersCount + 1,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleDeleteTweet(deletedId) {
    setState({
      user: {
        ...state.user,
        tweets: state.user.tweets.filter((id) => id != deletedId),
      },
    });
  }
  const updateUser = (user) => {
    setState({ user });
  };

  const options = useMemo(
    () => ({
      method: "GET",
      url: `${process.env.API_URL}/user/${params.screenName}/`,
      headers: { authorization: authState.token },
    }),
    [authState.token, params.screenName]
  );

  const onFetch = useCallback(function onFetch(response) {
    if (response.status === 200) {
      setState({ user: response.data.user, loading: false, errorMessage: "" });
      document.title = `${response.data.user.name} (@${response.data.user.handle}) / Twitter Clone`;
    }
  }, []);

  const onError = useCallback(function onError(error) {
    if (error.response.status === 404) {
      setState({
        user: {},
        loading: false,
        errorMessage: error.response.data.message,
      });
    }
  }, []);

  const onCancel = useCallback(function onCancel(error) {
    if (error) {
      console.log(error);
    }
  }, []);

  useAxiosFetch(options, {
    onFetch,
    onError,
    onCancel,
  });

  return state.loading ? (
    <Spinner />
  ) : (
    <div className="profile">
      <div className="profile-header">
        <div className="btn-wrapper">
          <Link className="btn btn--icon" to="/home">
            <BackIcon />
          </Link>
        </div>
        <div className="profile-header-content">
          {!state.errorMessage ? (
            <>
              <h2>{state.user.handle}</h2>
              <p>{`${state.user.tweets.length} Tweet`}</p>
            </>
          ) : (
            <h2>Profile</h2>
          )}
        </div>
      </div>
      <div className="profile-content">
        <Banner src={state.user.bannerURL} />
        <div className="profile-user">
          <div className="row">
            <Avatar src={state.user.avatarURL} size="medium" />

            {!state.errorMessage ? (
              <>
                {state.user.isSelf ? (
                  <button className="btn" onClick={toggleModal}>
                    Edit profile
                  </button>
                ) : state.user.following ? (
                  <button
                    className="btn btn--blue btn--follow"
                    onClick={handleFollow}
                  ></button>
                ) : (
                  <button className="btn" onClick={handleFollow}>
                    Follow
                  </button>
                )}
                {isModalVisible ? (
                  <Modal>
                    <EditProfile
                      onClick={toggleModal}
                      user={state.user}
                      update={updateUser}
                    />
                  </Modal>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="profile-user-info">
            {!state.errorMessage ? (
              <>
                <h2 className="profile-user-name">{state.user.name}</h2>
                <span className="profile-user-handle">{`@${state.user.handle}`}</span>
                <p className="profile-user-bio">{state.user.bio}</p>
                <ul className="profile-user-info-list">
                  {state.user.location ? (
                    <li>
                      <MapMarkerIcon />
                      <span>{state.user.location}</span>
                    </li>
                  ) : null}
                  {state.user.website ? (
                    <li>
                      <LinkIcon />
                      <span className="profile-user-website">
                        <a
                          href={`http://${state.user.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {state.user.website}
                        </a>
                      </span>
                    </li>
                  ) : null}
                  {state.user.birthDate ? (
                    <li>
                      <BalloonIcon />
                      <span>
                        {new Date(state.user.birthDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </li>
                  ) : null}
                  <li>
                    <CalendarIcon />
                    <span>
                      {new Date(state.user.joinDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </li>
                </ul>
                <div className="profile-user-follow-info">
                  <span>
                    <span className="count">{state.user.followingCount}</span>
                    <span> Following</span>
                  </span>
                  <span>
                    <span className="count">{state.user.followersCount}</span>
                    <span> Followers</span>
                  </span>
                </div>
              </>
            ) : (
              <h2 className="profile-user-name">{`@${params.screenName}`}</h2>
            )}
          </div>
        </div>
        {!state.errorMessage ? (
          !state.user.tweets.length ? null : (
            state.user.tweets.map((tweet) => (
              <Tweet key={tweet} id={tweet} onDelete={handleDeleteTweet} />
            ))
          )
        ) : (
          <div className="error-wrapper">
            <div className="error">
              <h2>{state.errorMessage.split("\n")[0]}</h2>
              <span>{state.errorMessage.split("\n")[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
