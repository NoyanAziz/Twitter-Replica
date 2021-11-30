import React from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Box, CssBaseline, Divider } from "@mui/material/";

import { removeAuthenticatedUser } from "../redux/actions/authenticatedUsersAction";

import SearchUserComponent from "./commonComponents/SearchUserComponent";
import HomeDrawer from "./commonComponents/HomeDrawer";
import PagesContainer from "./commonComponents/PagesContainer";
import { removeNotifications } from "../redux/actions/notificationsAction";
import { removeTweets } from "../redux/actions/tweetsActions/removeTweetsAction";

const UnconnectedHome = ({
  authenticatedUser,
  removeAuthenticatedUser,
  removeNotifications,
  removeTweets,
}) => {
  return (
    <Route>
      {!authenticatedUser ? (
        <Redirect to="/login" />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <BrowserRouter>
            <HomeDrawer
              removeAuthenticatedUser={removeAuthenticatedUser}
              removeNotifications={removeNotifications}
              removeTweets={removeTweets}
            />

            <PagesContainer />
          </BrowserRouter>
          <Divider orientation="vertical" flexItem />

          <SearchUserComponent authenticatedUser={authenticatedUser} />
        </Box>
      )}
    </Route>
  );
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});

const mapDispatchToProps = {
  removeAuthenticatedUser: removeAuthenticatedUser,
  removeNotifications: removeNotifications,
  removeTweets: removeTweets,
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedHome);
