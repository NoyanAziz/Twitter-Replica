import axios from "axios";
import { getRequestHeader } from "../../utils";
import { fetchNotifications } from "./notificationsAction";
import { fetchExplore } from "./tweetsActions/exploreAction";
import { fetchMyTweets } from "./tweetsActions/myTweetsAction";
import { fetchNewsfeed } from "./tweetsActions/newsfeedAction";

export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";
export const REMOVE_AUTHENTICATED_USER = "REMOVE_AUTHENTICATED_USER";

export function setAuthenticatedUser(authenticatedUser) {
  return {
    type: SET_AUTHENTICATED_USER,
    authenticatedUser,
  };
}

export function removeAuthenticatedUser() {
  return {
    type: REMOVE_AUTHENTICATED_USER,
  };
}

export const fetchUserInfo = (token) => async (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/users/profile/", getRequestHeader(token))
    .then((res) => {
      localStorage.setItem("authenticatedUser", JSON.stringify(res.data));
      dispatch(setAuthenticatedUser(res.data));
      dispatch(fetchNewsfeed(token));
      dispatch(fetchExplore(token));
      dispatch(fetchMyTweets(token));
      dispatch(fetchNotifications(token));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const authenticateUser = (values) => async (dispatch) => {
  axios
    .post("http://127.0.0.1:8000/token/", { ...values })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      dispatch(fetchUserInfo(res.data.access));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const addNewUser = (values) => async (dispatch) => {
  axios
    .post("http://127.0.0.1:8000/users/users/signup/", { ...values })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(authenticateUser(values));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const updateProfile =
  (updatedProfileInfo, token) => async (dispatch) => {
    axios
      .patch(
        "http://127.0.0.1:8000/users/profile/",
        updatedProfileInfo,
        getRequestHeader(token)
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("authenticatedUser", JSON.stringify(res.data));
        dispatch(setAuthenticatedUser(res.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server response: ", error.response.data);
        }
      });
  };
