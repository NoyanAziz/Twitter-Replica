import axios from "axios";
import { getRequestHeader } from "../../../utils";

export const SET_MY_TWEETS = "SET_MY_TWEETS";

export function setMyTweets(myTweets) {
  return {
    type: SET_MY_TWEETS,
    myTweets,
  };
}

export const fetchMyTweets = (token) => async (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/tweets/user-tweets/", getRequestHeader(token))
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setMyTweets(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
