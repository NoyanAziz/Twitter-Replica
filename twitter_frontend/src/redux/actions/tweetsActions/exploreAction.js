import axios from "axios";
import { getRequestHeader } from "../../../utils";

export const SET_EXPLORE = "SET_EXPLORE";

export function setExplore(explore) {
  return {
    type: SET_EXPLORE,
    explore,
  };
}

export const fetchExplore = (token) => async (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/tweets/tweets/", getRequestHeader(token))
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setExplore(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
