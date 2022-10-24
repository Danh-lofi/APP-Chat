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
  existUsername: (username) => {
    const url = "/forgot/verify";
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
  registerInfomation: (user) => {
    const url = "/register/info";
    return axiosClient.post(url, { user });
  },
  resetPassword: (username, password) => {
    const url = "/forgot/reset-password";
    return axiosClient.post(url, { username, password });
  },
};

export default authApi;
