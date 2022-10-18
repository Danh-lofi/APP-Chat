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
  profile: (accessToken) => {
    const url = "http://localhost:3001/profile";
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
      })
      .then((response) => {
        return response;
      });
  },
};

export default authApi;
