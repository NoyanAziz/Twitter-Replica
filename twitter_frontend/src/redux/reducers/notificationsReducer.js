import {
  SET_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS,
} from "../actions/notificationsAction";

const initialState = {
  notifications: [],
};

export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case REMOVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};
