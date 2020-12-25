import { Link, useParams } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { AuthContext } from "./AuthContext";

const Profile = () => {
  const { isModalVisible, toggleModal } = useModal(false);
  const authState = useContext(AuthContext);
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refreshProfile = () => {
    setLoading(true);
  };

  useEffect(() => {
    document.title = `Profile / Twitter Clone`;
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/user/${params.screenName}`,
      headers: { authorization: authState.token },
    })
      .then((response) => {
        if (response.status == 200) {
          setErrorMessage("");
          setUser(response.data.user);
          document.title = `${response.data.user.name} (@${response.data.user.handle}) / Twitter Clone`;
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setErrorMessage(error.response.data.message);
          setUser({});
          setLoading(false);
        }
      });
  }, [params.screenName, authState.token, loading]);

  return loading ? (
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
          {!errorMessage ? (
            <>
              <h2>{user.handle}</h2>
              <p>{`${user.tweets.length} Tweet`}</p>
            </>
          ) : (
            <h2>Profile</h2>
          )}
        </div>
      </div>
      <div className="profile-content">
        <Banner src={user.bannerURL} />
        <div className="profile-user">
          <div className="row">
            <Avatar src={user.avatarURL} size="medium" />

            {!errorMessage ? (
              <>
                <button className="btn" onClick={toggleModal}>
                  Edit profile
                </button>
                {isModalVisible ? (
                  <Modal>
                    <EditProfile
                      onClick={toggleModal}
                      user={user}
                      refreshProfile={refreshProfile}
                    />
                  </Modal>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="profile-user-info">
            {!errorMessage ? (
              <>
                <h2 className="profile-user-name">{user.name}</h2>
                <span className="profile-user-handle">{`@${user.handle}`}</span>
                <p className="profile-user-bio">{user.bio}</p>
                <ul className="profile-user-info-list">
                  {user.location ? (
                    <li>
                      <MapMarkerIcon />
                      <span>{user.location}</span>
                    </li>
                  ) : null}
                  {user.website ? (
                    <li>
                      <LinkIcon />
                      <span className="profile-user-website">
                        <a
                          href={`http://${user.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {user.website}
                        </a>
                      </span>
                    </li>
                  ) : null}
                  {user.birthDate ? (
                    <li>
                      <BalloonIcon />
                      <span>
                        {new Date(user.birthDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </li>
                  ) : null}
                  <li>
                    <CalendarIcon />
                    <span>
                      {new Date(user.joinDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </li>
                </ul>
                <div className="profile-user-follow-info">
                  <span>
                    <span className="count">{user.following.length}</span>
                    <span> Following</span>
                  </span>
                  <span>
                    <span className="count">{user.followers.length}</span>
                    <span> Followers</span>
                  </span>
                </div>
              </>
            ) : (
              <h2 className="profile-user-name">{`@${params.screenName}`}</h2>
            )}
          </div>
        </div>
        {!errorMessage ? (
          !user.tweets.length ? null : (
            user.tweets.map((tweet) => (
              <Tweet key={tweet.id} tweetData={tweet} />
            ))
          )
        ) : (
          <div className="error-wrapper">
            <div className="error">
              <h2>{errorMessage.split("\n")[0]}</h2>
              <span>{errorMessage.split("\n")[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
