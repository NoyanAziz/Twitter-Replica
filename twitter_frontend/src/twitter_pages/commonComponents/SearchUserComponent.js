import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material/";

import {
  fetchSearchedUsers,
  resetSearchedUsers,
} from "../../redux/actions/searchedUsersAction";

import {
  followUser,
  unfollowUser,
} from "../../redux/actions/followUsersAction";

const token = localStorage.getItem("access");

const SearchUserComponent = ({
  authenticatedUser,
  searchedUsers,
  fetchSearchedUsers,
  resetSearchedUsers,
  followUser,
  unfollowUser,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleFollow = (followed, userId) => {
    if (authenticatedUser.id !== userId) {
      if (followed) {
        try {
          unfollowUser(userId, token);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          followUser(userId, token);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <Box sx={{ width: 400, margin: 5 }}>
      <TextField
        fullWidth
        variant="outlined"
        id="searchUser"
        name="searchUser"
        type="search"
        placeholder="Search users.."
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
          if (event.target.value === "") {
            resetSearchedUsers();
          } else {
            fetchSearchedUsers(event.target.value);
          }
        }}
      />

      <List>
        {searchedUsers.map((searchedUser) => (
          <ListItem
            alignItems="flex-start"
            sx={{ my: "20px" }}
            button
            key={searchedUser.email}
          >
            <ListItemAvatar>
              <Avatar src={searchedUser.profile_picture} />
            </ListItemAvatar>

            <ListItemText
              sx={{ width: 160 }}
              primary={searchedUser.name}
              secondary={
                <div>
                  <div>email: {searchedUser.email}</div>
                  <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                    bio: {searchedUser.bio}
                  </div>
                </div>
              }
            />

            <ListItemButton
              edge="end"
              sx={{ width: 10 }}
              onClick={() =>
                handleFollow(
                  authenticatedUser.following.some(
                    (following) => following.id === searchedUser.id
                  ),
                  searchedUser.id
                )
              }
            >
              {authenticatedUser.following.some(
                (following) => following.id === searchedUser.id
              )
                ? "Unfollow"
                : "Follow"}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  searchedUsers: state.searchedUsers.searchedUsers,
});
const mapDispatchToProps = {
  fetchSearchedUsers: fetchSearchedUsers,
  resetSearchedUsers: resetSearchedUsers,
  followUser: followUser,
  unfollowUser: unfollowUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserComponent);
