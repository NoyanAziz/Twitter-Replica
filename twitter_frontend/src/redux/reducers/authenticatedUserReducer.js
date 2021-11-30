import {
  SET_AUTHENTICATED_USER,
  REMOVE_AUTHENTICATED_USER,
} from "../actions/authenticatedUsersAction";

const initialState = {
  authenticatedUser: JSON.parse(localStorage.getItem("authenticatedUser")),
};

export const authenticatedUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return {
        ...state,
        authenticatedUser: action.authenticatedUser,
      };
    case REMOVE_AUTHENTICATED_USER:
      return {
        ...state,
        authenticatedUser: null,
      };
    default:
      return state;
  }
};
