import {
  SET_SEARCHED_USERS,
  RESET_SEARCHED_USERS,
} from "../actions/searchedUsersAction";

const initialState = {
  searchedUsers: [],
};

export const searchedUsers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.searchedUsers,
      };
    case RESET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: [],
      };
    default:
      return state;
  }
};
