import axios from "axios";
import { getRequestHeader } from "../../../utils";

export const SET_NEWSFEED = "SET_NEWSFEED";

export function setNewsfeed(newsfeed) {
  return {
    type: SET_NEWSFEED,
    newsfeed,
  };
}

export const fetchNewsfeed = (token) => async (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/tweets/newsfeed/", getRequestHeader(token))
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setNewsfeed(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
