import axios from "axios";

export const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
export const RESET_SEARCHED_USERS = "RESET_SEARCHED_USERS";

export function setSearchedUsers(searchedUsers) {
  return {
    type: SET_SEARCHED_USERS,
    searchedUsers,
  };
}

export function resetSearchedUsers() {
  return {
    type: RESET_SEARCHED_USERS,
  };
}

export const fetchSearchedUsers = (searchText) => async (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/users/search-users/?search=${searchText}`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setSearchedUsers(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
