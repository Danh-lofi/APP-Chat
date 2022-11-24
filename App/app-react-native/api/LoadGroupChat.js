import { apiGet } from "./ApiManager";
import ApiManager from "./ApiManager";

const ApiLoadGroupChat = {
  getGroupChat: async (token) => {
    const url = `/groupChat/getGroupChat`;
    return await apiGet.get(url, token);
  },

  createGroup: async (data) => {
    const url = `/groupChat/createGroup`;
    return await apiGet.post(url, data);
  },

  getMemberGroupChat: async (idGroupChat) => {
    const url = `/groupChat/${idGroupChat}`;
    return await apiGet.get(url, {});
  },

  deleteUserFromGroupChat: async (data) => {
    const url = `/groupChat/deleteUserFromGroupChat`;
    return await apiGet.put(url, data);
  },
};

export default ApiLoadGroupChat;
