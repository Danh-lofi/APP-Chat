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
  createGroup: (accessToken, nameGroupChat, memberChat) => {
    const url = `/groupChat/createGroup`;
    return axiosClient.post(
      url,
      {
        nameGroupChat,
        memberChat,
      },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
};

export default groupApi;
