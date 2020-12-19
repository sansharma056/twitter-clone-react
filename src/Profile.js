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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Profile / Twitter Clone`;
  });

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url: `http://localhost:3000/api/user/${params.screenName}`,
      headers: { authorization: authState.token },
    })
      .then((response) => {
        if (response.status == 200) {
          setUser(response.data.user);
          document.title = `${response.data.user.name} (@${response.data.user.handle}) / Twitter Clone`;
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.screenName, authState.token]);

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
          <h2>{user.handle}</h2>
          <p>{`${user.tweets.length} Tweet`}</p>
        </div>
      </div>
      <div className="profile-content">
        <Banner src={user.bannerURL} />
        <div className="profile-user">
          <div className="row">
            <Avatar size="medium" />
            <button className="btn" onClick={toggleModal}>
              Edit profile
            </button>
            {isModalVisible ? (
              <Modal>
                <EditProfile onClick={toggleModal} />
              </Modal>
            ) : null}
          </div>
          <div className="profile-user-info">
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
                  <span>{user.birthDate}</span>
                </li>
              ) : null}
              <li>
                <CalendarIcon />
                <span>{user.joinDate}</span>
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
          </div>
        </div>
        {!user.tweets.length
          ? null
          : user.tweets.map((tweet) => (
              <Tweet key={tweet.id} tweetData={tweet} />
            ))}
      </div>
    </div>
  );
};

export default Profile;
