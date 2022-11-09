import axiosClient from "./axiosClient";

const groupApi = {
  getGroups: (accessToken) => {
    const url = `/groupChat/getAllGroup`;
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

export default groupApi;
