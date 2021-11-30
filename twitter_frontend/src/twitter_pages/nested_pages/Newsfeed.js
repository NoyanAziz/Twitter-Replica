import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, Divider } from "@mui/material/";

import PostTweetComponent from "../commonComponents/PostTweetComponent";
import { TweetList } from "../commonComponents/TweetList";

import { fetchNewsfeed } from "../../redux/actions/tweetsActions/newsfeedAction";

const token = localStorage.getItem("access");

const Newsfeed = ({ authenticatedUser, newsfeed, fetchNewsfeed }) => {
  useEffect(() => {
    fetchNewsfeed(token);
  }, [fetchNewsfeed]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PostTweetComponent token={token} />

      <Divider />

      <TweetList
        tweets={newsfeed}
        authenticatedUser={authenticatedUser}
        token={token}
      />
    </Box>
  );
};
const mapStateToProps = (state) => ({
  newsfeed: state.tweets.newsfeed,
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});
const mapDispatchToProps = {
  fetchNewsfeed: fetchNewsfeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
