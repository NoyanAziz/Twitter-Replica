import axios from "axios";
import { getRequestHeader } from "../../../utils";

import { fetchExplore } from "./exploreAction";
import { fetchNewsfeed } from "./newsfeedAction";

export const likeTweet = (tweetId, token) => async (dispatch) => {
  axios
    .post(
      "http://127.0.0.1:8000/tweets/likes/",
      { tweet: tweetId },
      getRequestHeader(token)
    )
    .then(() => {
      console.log("Liked successfully");
      dispatch(fetchExplore(token));
      dispatch(fetchNewsfeed(token));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const unlikeTweet = (tweetId, token) => async (dispatch) => {
  axios
    .delete("http://127.0.0.1:8000/tweets/likes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        tweet: tweetId,
      },
    })
    .then(() => {
      console.log("Unliked successfully");
      dispatch(fetchExplore(token));
      dispatch(fetchNewsfeed(token));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
