import axios from "axios";
import { getRequestHeader } from "../../../utils";

import { fetchMyTweets } from "./myTweetsAction";

export const updateTweet =
  (tweetClicked, editPost, token) => async (dispatch) => {
    axios
      .patch(
        `http://127.0.0.1:8000/tweets/tweets/${tweetClicked}/`,
        { body: editPost },
        getRequestHeader(token)
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(fetchMyTweets(token));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server response", error.response.data);
        }
      });
  };

export const deleteTweet = (tweetClicked, token) => async (dispatch) => {
  axios
    .delete(
      `http://127.0.0.1:8000/tweets/tweets/${tweetClicked}/`,
      getRequestHeader(token)
    )
    .then((res) => {
      console.log("Tweet deleted successfully");
      dispatch(fetchMyTweets(token));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
