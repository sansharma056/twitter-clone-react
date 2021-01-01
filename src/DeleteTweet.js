import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const DeleteTweet = ({ onClick: toggleModal, id }) => {
  const authState = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    axios({
      method: "DELETE",
      url: `${process.env.API_URL}/tweet/${id}`,
      headers: { authorization: authState.token },
    }).catch((error) => {
      console.log(error);
    });
    setDeleting(false);
    toggleModal();
  }

  return (
    <div className="delete-tweet">
      <div className="delete-tweet-content">
        <h2>Delete Tweet?</h2>
        <span>
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </span>
      </div>
      <div className="delete-tweet-footer">
        <button className="btn" onClick={toggleModal}>
          Cancel
        </button>
        <button
          className="btn btn--red"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteTweet;
