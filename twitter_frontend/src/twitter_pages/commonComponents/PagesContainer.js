import React from "react";
import { Switch, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Profile from "../nested_pages/Profile";
import Newsfeed from "../nested_pages/Newsfeed";
import Explore from "../nested_pages/Explore";
import Notifications from "../nested_pages/Notifications";
import MyTweets from "../nested_pages/MyTweets";

const PagesContainer = () => {
  return (
    <Box sx={{ width: 700, flexDirection: "column" }}>
      <Typography component="h1" variant="h5" textAlign="left" margin="5px">
        {window.location.pathname.substr(1).replace("%20", " ")}
      </Typography>

      <Box component="main">
        <Switch>
          <Route exact path="/Home" render={() => <Newsfeed />} />
          <Route exact path="/Explore" render={() => <Explore />} />
          <Route exact path="/Notifications" render={() => <Notifications />} />
          <Route exact path="/Profile" render={() => <Profile />} />
          <Route exact path="/My Tweets" render={() => <MyTweets />} />
        </Switch>
      </Box>
    </Box>
  );
};

export default PagesContainer;
