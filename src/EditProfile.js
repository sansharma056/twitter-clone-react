import React, { useState, useContext } from "react";
import { AddCameraIcon, TimesCircle } from "./Icons";
import { Link } from "@reach/router";
import Banner from "./Banner";
import Avatar from "./Avatar";
import Input from "./Input";
import Textarea from "./Textarea";
import useInput from "./useInput";
import Modal from "./Modal";
import useModal from "./useModal";
import EditMedia from "./EditMedia";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import readFile from "./utils/readFile";

const EditProfile = ({ user, onClick: toggleModal, refreshProfile }) => {
  const name = useInput(user.name ? user.name : "");
  const bio = useInput(user.bio ? user.bio : "");
  const location = useInput(user.location ? user.location : "");
  const website = useInput(user.website ? user.website : "");
  const dob = useInput(user.birthDate.split("T")[0]);
  const [banner, setBanner] = useState(user.bannerURL ? user.bannerURL : "");
  const [avatar, setAvatar] = useState(user.avatarURL ? user.avatarURL : "");
  const [aspect, setAspect] = useState(null);
  const [media, setMedia] = useState(null);
  const editMediaModal = useModal(false);
  const authState = useContext(AuthContext);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    axios({
      method: "PUT",
      url: `${process.env.API_URL}/user/${authState.screenName}`,
      headers: { authorization: authState.token },
      data: {
        name: name.state,
        description: bio.state,
        location: location.state,
        url: website.state,
        date_of_birth: dob.state,
        banner_url: banner,
        profile_picture_url: avatar,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setSaving(false);
          refreshProfile();
          toggleModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="edit-profile-form">
      <div className="edit-profile-header">
        <div className="btn-wrapper">
          <Link
            to={`/${user.handle}`}
            onClick={toggleModal}
            className="btn btn--icon"
          >
            <TimesCircle />
          </Link>
        </div>
        <h2>Edit profile</h2>
        <button
          onClick={handleSubmit}
          className="btn btn--blue"
          disabled={saving}
        >
          {saving ? "Saving" : "Save"}
        </button>
      </div>
      <div className="edit-profile-content">
        <div className="edit-profile-content-wrapper">
          <div className="banner-upload-wrapper">
            <Banner src={banner} />
            <div className="upload-overlay"></div>
            <div className="upload-group">
              <label
                htmlFor="banner-upload"
                className="btn btn--icon btn--icon--white"
              >
                <AddCameraIcon />
              </label>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  readFile(e.target.files[0]).then(setMedia);
                  setAspect(3);
                  editMediaModal.toggleModal();
                }}
              />
            </div>
          </div>
          <div className="avatar-upload-wrapper">
            <Avatar size="medium" src={avatar} />
            <div className="upload-overlay"></div>
            <div className="upload-group">
              <label
                htmlFor="avatar-upload"
                className="btn btn--icon btn--icon--white"
              >
                <AddCameraIcon />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  readFile(e.target.files[0]).then(setMedia);
                  setAspect(1);
                  editMediaModal.toggleModal();
                }}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              labelName="Name"
              id="name"
              value={name.state}
              onChange={name.onChange}
            />
          </div>
          <div className="input-wrapper">
            <Textarea
              labelName="Bio"
              id="bio"
              value={bio.state}
              onChange={bio.onChange}
            />
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              labelName="Location"
              id="location"
              value={location.state}
              onChange={location.onChange}
            />
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              labelName="Website"
              id="website"
              value={website.state}
              onChange={website.onChange}
            />
          </div>
          <div className="input-wrapper">
            <Input
              type="date"
              labelName="Birth Date"
              id="dob"
              value={dob.state}
              onChange={dob.onChange}
            />
          </div>
          {editMediaModal.isModalVisible ? (
            <Modal>
              <EditMedia
                media={media}
                aspect={aspect}
                onClick={editMediaModal.toggleModal}
                onComplete={aspect === 3 ? setBanner : setAvatar}
              />
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
