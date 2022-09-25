import axiosClient from "./axiosClient";

const loginApi = {
  login: (username, password) => {
    const url = "/Login";
    return axiosClient.post(url, { username, password });
  },
  registry: (username, password) => {
    const url = "/Register";

    return axiosClient.post(url, { username, password });
  },
};

export default loginApi;
