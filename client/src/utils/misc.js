import Axios from "../axios";

export const setAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};
