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
};

export default authApi;
