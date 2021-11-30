import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { authenticateUser } from "../redux/actions/authenticatedUsersAction";
import LoginForm from "../twitter_pages/commonComponents/LoginForm";
import LoginSignupView from "../twitter_pages/commonComponents/LoginSignupView";

const UnconnectedLogin = ({ authenticatedUser, authenticateUser }) => {
  return (
    <Route>
      {" "}
      {authenticatedUser ? (
        <Redirect to="/Home" />
      ) : (
        <LoginSignupView
          Form={<LoginForm authenticateUser={authenticateUser} />}
        />
      )}
    </Route>
  );
};
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});

const mapDispatchToProps = {
  authenticateUser: authenticateUser,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedLogin);
