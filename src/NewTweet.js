import React, { useState } from "react";
import useInput from "./useInput";
import Avatar from "./Avatar";
import Media from "./Media";
import { ImageIcon, TimesCircle } from "./Icons";
import readFile from "./utils/readFile";
import Modal from "./Modal";
import useModal from "./useModal";
import EditPhoto from "./EditPhoto";
import getAspectRatio from "./utils/getAspectRatio";

const NewTweet = ({ avatarURL }) => {
  const tweet = useInput("");
  const [photo, setPhoto] = useState(null);
  const [aspect, setAspect] = useState(null);
  const { isModalVisible, toggleModal } = useModal(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tweet, photo);
  }

  return (
    <div className="new-tweet">
      <div className="new-tweet-l">
        <Avatar src={avatarURL} />
      </div>
      <div className="new-tweet-r">
        <form className="new-tweet-form" onSubmit={handleSubmit}>
          <div className="new-tweet-editor">
            <textarea
              value={tweet.state}
              placeholder="What's happening?"
              onChange={tweet.onChange}
            />
          </div>

          {photo ? (
            <div className="new-tweet-media">
              <Media src={photo} />
              {isModalVisible ? (
                <Modal>
                  <EditPhoto
                    photo={photo}
                    onClick={toggleModal}
                    onComplete={setPhoto}
                    orignalAspectRatio={aspect}
                  />
                </Modal>
              ) : null}
              <div className="btn-wrapper">
                <button
                  className="btn btn--icon btn--icon--black"
                  onClick={(e) => {
                    e.preventDefault;
                    setPhoto(null);
                  }}
                >
                  <TimesCircle />
                </button>
              </div>
              <button
                className="btn btn--black edit"
                onClick={(e) => {
                  e.preventDefault();
                  setAspect(getAspectRatio(photo));
                  toggleModal();
                }}
              >
                Edit
              </button>
            </div>
          ) : null}

          <div className="new-tweet-footer">
            <label htmlFor="file-input" className="btn btn--icon">
              <ImageIcon />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                readFile(e.target.files[0]).then(setPhoto);
              }}
            />
            <button type="submit" className="btn btn--blue">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTweet;
