import axios from "axios";
import { getRequestHeader } from "../../utils";

import { setAuthenticatedUser } from "./authenticatedUsersAction";

export const followUser = (userId, token) => async (dispatch) => {
  axios
    .post(
      "http://127.0.0.1:8000/tweets/follow/",
      { user_id: userId },
      getRequestHeader(token)
    )
    .then((res) => {
      console.log(res.data);
      dispatch(setAuthenticatedUser(res.data));
      localStorage.setItem("authenticatedUser", JSON.stringify(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const unfollowUser = (userId, token) => async (dispatch) => {
  axios
    .delete("http://127.0.0.1:8000/tweets/follow/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: userId,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch(setAuthenticatedUser(res.data));
      localStorage.setItem("authenticatedUser", JSON.stringify(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
