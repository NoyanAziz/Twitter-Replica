import axios from "axios";
import { getRequestHeader } from "../../utils";

export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const REMOVE_NOTIFICATIONS = "REMOVE_NOTIFICATIONS";

export function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  };
}

export function removeNotifications() {
  return {
    type: REMOVE_NOTIFICATIONS,
  };
}

export const fetchNotifications = (token) => async (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/tweets/notifications/", getRequestHeader(token))
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setNotifications(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
