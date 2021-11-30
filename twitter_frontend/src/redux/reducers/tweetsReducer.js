import { SET_EXPLORE } from "../actions/tweetsActions/exploreAction";
import { SET_NEWSFEED } from "../actions/tweetsActions/newsfeedAction";
import { SET_MY_TWEETS } from "../actions/tweetsActions/myTweetsAction";
import { REMOVE_TWEETS } from "../actions/tweetsActions/removeTweetsAction";

const initialState = {
  newsfeed: [],
  explore: [],
  myTweets: [],
};

export const tweets = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWSFEED:
      return {
        ...state,
        newsfeed: action.newsfeed,
      };
    case SET_EXPLORE:
      return {
        ...state,
        explore: action.explore,
      };
    case SET_MY_TWEETS:
      return {
        ...state,
        myTweets: action.myTweets,
      };
    case REMOVE_TWEETS:
      return {
        ...state,
        newsfeed: [],
        explore: [],
        myTweets: [],
      };
    default:
      return state;
  }
};
