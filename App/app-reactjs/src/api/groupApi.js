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
  getGroup: (idGroup) => {
    const url = `/groupChat/get-info-group/${idGroup}`;
    return axiosClient.get(url, {});
  },
  createGroup: (accessToken, data) => {
    const url = `/groupChat/createGroup`;
    return axiosClient.post(
      url,
      {
        nameGroupChat: data.name,
        memberChat: data.members,
        data: data.avatar,
        type: data.type,
        fileName: data.fileName,
      },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
  //
  addUsersToGroup: (idGroupChat, listIdUser) => {
    const url = `/groupChat/add-users`;
    return axiosClient.put(url, { idGroupChat, listIdUser });
  },
  //
  deleteMemberFromGroup: (idGroup, idUserDeleted) => {
    const url = `/groupChat/deleteUserFromGroupChat`;
    return axiosClient.put(url, {
      _id: idGroup,
      idUserDeleted,
    });
  },
};

export default groupApi;
