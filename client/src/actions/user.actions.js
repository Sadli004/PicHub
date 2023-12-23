import axios from "axios";

export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// errors
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
        }
        return axios.get(`${REACT_APP_API_URL}api/user/${id}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idtoFollow) => {
  return (dispatch) => {
    return (
      axios
        .patch(`${REACT_APP_API_URL}api/user/follow/${followerId}`, {
          idtoFollow,
        })
        // ^ Send idtoFollow as part of the request body
        .then((res) => {
          dispatch({ type: FOLLOW_USER, payload: idtoFollow });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const UnfollowUser = (followerId, idtoUnfollow) => {
  return (dispatch) => {
    return (
      axios
        .patch(`${REACT_APP_API_URL}api/user/unfollow/${followerId}`, {
          idtoUnfollow,
        })
        // ^ Send idtoUnfollow as part of the request body
        .then((res) => {
          dispatch({ type: UNFOLLOW_USER, payload: idtoUnfollow });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const updateBio = (id, bio) => {
  return (dispatch) => {
    return axios
      .put(`${REACT_APP_API_URL}api/user/` + id, { bio })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
