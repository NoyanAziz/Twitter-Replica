import React from "react";
import { List, Box } from "@mui/material";
import TweetItem from "./TweetItem";

export const TweetList = ({ tweets, authenticatedUser, token }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {" "}
      <List spacing={4}>
        {tweets.map((tweet) => (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            authenticatedUser={authenticatedUser}
            token={token}
          />
        ))}
      </List>
    </Box>
  );
};
