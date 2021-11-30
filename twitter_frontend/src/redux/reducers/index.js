import { combineReducers } from "redux";
import { authenticatedUser } from "./authenticatedUserReducer";
import { searchedUsers } from "./searchedUsersReducer";
import { tweets } from "./tweetsReducer";
import { notifications } from "./notificationsReducer";

export default combineReducers({
  authenticatedUser,
  searchedUsers,
  tweets,
  notifications,
});
