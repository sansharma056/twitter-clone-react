import React, { useRef } from "react";
import { AddCameraIcon, TimesCircle } from "./Icons";
import { Link } from "@reach/router";
import Banner from "./Banner";
import Avatar from "./Avatar";
import Input from "./Input";
import Textarea from "./Textarea";
import useInput from "./useInput";

const EditProfile = ({ onClick: toggleModal }) => {
  const user = {
    name: "John Doe",
    handle: "johndoe",
    bio: "foo",
    location: "foo",
    website: "foo",
    dob: "2000-01-01",
  };

  const name = useInput(user.name);
  const bio = useInput(user.bio);
  const location = useInput(user.website);
  const website = useInput(user.website);
  const dob = useInput(user.dob);
  const bannerUploadEl = useRef(null);
  const avtarUploadEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      name.state,
      bio.state,
      location.state,
      website.state,
      dob.state,
      bannerUploadEl.current.files[0],
      avtarUploadEl.current.files[0]
    );
    toggleModal();
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
        <button onClick={handleSubmit} className="btn btn--blue">
          Save
        </button>
      </div>
      <div className="edit-profile-content">
        <div className="edit-profile-content-wrapper">
          <div className="banner-upload-wrapper">
            <Banner />
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
                ref={bannerUploadEl}
                accept="image/*"
              />
            </div>
          </div>
          <div className="avatar-upload-wrapper">
            <Avatar size="medium" />
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
                ref={avtarUploadEl}
                accept="image/*"
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
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
