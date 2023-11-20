import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { FollowHandler } from "./FollowHandler";
import { isEmpty } from "../Utils";

const UpdateProfil = () => { 
  const [bio,setBio] = useState("");
  const [updateForm,setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer) ;
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.allUsersReducer);
  const error = useSelector((state) => state.errorReducer.userErrors);
  const [followersPopup, setFollowersPopup ] = useState(false);
  const [followingPopup, setFollowingPopup ] = useState(false);
  

  const handleUpdate = () => {
    dispatch(updateBio(userData._id,bio));
    setUpdateForm(false)
  };
  const cancelUpdate = () => { 
    setUpdateForm(false);
  }
return(
  <div className="profile-container">  
    <h1>{userData.pseudo}'s profile</h1>
    
     <div className="update-container">
        <div className="left-part">
            <h3>Profile picture</h3>
            <img src = {userData.picture} alt="profile-img"/>
            <UploadImg/>
            {!isEmpty(error) && <p>{error.format}</p>}
            {!isEmpty(error) && <p>{error.maxSize}</p>}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button id="edit-bio-btn" onClick={() => setUpdateForm(!updateForm)}>
                  Edit bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button id="confirm-edit" onClick={handleUpdate}>Confirm Changes</button>
                <button id="cancel-edit" type="reset" value="Cancel" onClick={cancelUpdate}>Cancel</button>
              </>
            )}
          </div>
          <br />
          <div className="popup-buttons">
            <h5 id="following-popup-btn" onClick={() => {
              setFollowingPopup(true)
              setFollowersPopup (false)  }}>
              Following : {userData.following ? userData.following.length : ""}
            </h5>
            <h5 id="followers-popup-btn" onClick={() => {
              setFollowersPopup(true)
              setFollowingPopup(false)
              }}>
              Followers : {userData.followers ? userData.followers.length : ""}
            </h5>
            </div>  
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Following</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idtoFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  } 
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Followers</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={'suggestion'} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
  </div>
  );
};

export default UpdateProfil;