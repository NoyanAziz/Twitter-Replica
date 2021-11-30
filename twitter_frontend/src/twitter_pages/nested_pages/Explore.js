import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, Divider } from "@mui/material/";

import { fetchExplore } from "../../redux/actions/tweetsActions/exploreAction";
import { TweetList } from "../commonComponents/TweetList";
import PostTweetComponent from "../commonComponents/PostTweetComponent";

const token = localStorage.getItem("access");

const Explore = ({ authenticatedUser, explore, fetchExplore }) => {
  useEffect(() => {
    fetchExplore(token);
  }, [fetchExplore]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PostTweetComponent token={token} />
      <Divider />

      <TweetList
        tweets={explore}
        authenticatedUser={authenticatedUser}
        token={token}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  explore: state.tweets.explore,
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});
const mapDispatchToProps = {
  fetchExplore: fetchExplore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
