import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { addNewUser } from "../redux/actions/authenticatedUsersAction";
import LoginSignupView from "../twitter_pages/commonComponents/LoginSignupView";
import SignupForm from "../twitter_pages/commonComponents/SignupForm";

export const UnconnectedSignup = ({ authenticatedUser, addNewUser }) => {
  return (
    <Route>
      {authenticatedUser ? (
        <Redirect to="/Home" />
      ) : (
        <LoginSignupView Form={<SignupForm addNewUser={addNewUser} />} />
      )}
    </Route>
  );
};
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});

const mapDispatchToProps = {
  addNewUser: addNewUser,
};
export const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSignup);
