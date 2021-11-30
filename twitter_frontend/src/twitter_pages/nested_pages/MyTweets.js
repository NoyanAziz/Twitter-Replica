import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Box, Divider } from "@mui/material/";

import { fetchMyTweets } from "../../redux/actions/tweetsActions/myTweetsAction";
import PostTweetComponent from "../commonComponents/PostTweetComponent";
import MyTweetsList from "../commonComponents/MyTweetsList";

const token = localStorage.getItem("access");

const MyTweets = ({ myTweets, fetchMyTweets }) => {
  useEffect(() => {
    fetchMyTweets(token);
  }, [fetchMyTweets]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PostTweetComponent token={token} />

      <Divider />
      <MyTweetsList myTweets={myTweets} token={token} />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  myTweets: state.tweets.myTweets,
});
const mapDispatchToProps = {
  fetchMyTweets: fetchMyTweets,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTweets);
