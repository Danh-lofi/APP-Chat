import axiosClient from "./axiosClient";

const chatApi = {
  createChat: (senderId, receiverId) => {
    const url = "/chat";
    return axiosClient.post(url, { senderId, receiverId });
  },
  getChat: (senderId, receiverId) => {
    const url = `/chat/${senderId}.${receiverId}`;
    return axiosClient.get(url, {});
  },
  getGroupChat: (groupId) => {
    const url = `/chat/${groupId}`;
    return axiosClient.get(url, {});
  },
};

export default chatApi;
