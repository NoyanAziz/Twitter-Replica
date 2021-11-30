import axios from "axios";
import { getRequestHeader } from "../../../utils";
import { fetchExplore } from "./exploreAction";

import { fetchMyTweets } from "./myTweetsAction";
import { fetchNewsfeed } from "./newsfeedAction";

export const postTweet = (tweetData, token) => async (dispatch) => {
  axios
    .post(
      "http://127.0.0.1:8000/tweets/tweets/",
      tweetData,
      getRequestHeader(token)
    )
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(fetchNewsfeed(token));
      dispatch(fetchExplore(token));
      dispatch(fetchMyTweets(token));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
