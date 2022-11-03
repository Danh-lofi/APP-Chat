import axiosClient from "./axiosClient";

const chatApi = {
  createChat: (senderId, receiveId) => {
    const url = "/chat";
    return axiosClient.post(url, { senderId, receiveId });
  },
  getChat: (senderId, receiveId) => {
    const url = `/chat/${senderId}.${receiveId}`;
    return axiosClient.get(url, {});
  },
};

export default chatApi;
