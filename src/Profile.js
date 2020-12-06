import { Link } from "@reach/router";
import React, { useEffect } from "react";
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

const Profile = ({ handle }) => {
  const { isModalVisible, toggleModal } = useModal(false);

  const user = {
    avatarURL: "",
    bannerURL: "",
    name: "John Doe",
    handle: "johndoe",
    bio: "foo",
    location: "foo",
    website: "foo.foo",
    birthDate: "January 2000",
    joinDate: "January 2018",
    followers: 0,
    following: 0,
    tweets: [
      {
        id: 0,
        avatarURL: "",
        name: "John Doe",
        handle: "johndoe",
        content: "foo",
      },
    ],
  };
  // Placeholder, will replace with API call

  useEffect(() => {
    document.title = `${user.name} (@${user.handle}) / Twitter Clone`;
  });
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="btn-wrapper">
          <Link className="btn btn--icon" to="/home">
            <BackIcon />
          </Link>
        </div>
        <div className="profile-header-content">
          <h2>{handle}</h2>
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
                <span className="count">{user.following}</span>
                <span> Following</span>
              </span>
              <span>
                <span className="count">{user.followers}</span>
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
