import ApiManager, { apiGet } from "./ApiManager";

export const chatApi = {
  createChat: (senderId, receiveId) => {
    const url = "/chat";
    return apiGet.post(url, { senderId, receiveId });
  },
  getChat: (senderId, receiveId) => {
    const url = `/chat/${senderId}.${receiveId}`;
    return apiGet.get(url, {});
  },
};
