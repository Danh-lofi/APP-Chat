import axios from "axios";
import axiosClient from "./axiosClient";

const authApi = {
  login: (username, password) => {
    const url = "/login";
    return axiosClient.post(url, { username, password }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
  },
  register: (username, password) => {
    const url = "/register";
    return axiosClient.post(url, { username, password });
  },
  verifyUsername: (username) => {
    const url = "/register/verify";
    return axiosClient.post(url, { username });
  },
  profile: (accessToken) => {
    const url = "/profile";
    return axiosClient
      .get(url, {
        headers: {
          x_authorization: accessToken,
        },
      })
      .then((response) => {
        return response;
      });
  },
};

export default authApi;
