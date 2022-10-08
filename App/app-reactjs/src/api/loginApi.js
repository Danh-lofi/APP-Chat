import axiosClient from "./axiosClient";

const loginApi = {
  login: (username, password) => {
    const url = "/login";
    return axiosClient.post(url, { username, password });
  },
  registry: (username, password) => {
    const url = "/register";

    return axiosClient.post(url, { username, password });
  },
};

export default loginApi;
