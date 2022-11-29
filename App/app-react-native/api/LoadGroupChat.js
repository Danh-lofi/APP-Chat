import { apiGet } from "./ApiManager";
import ApiManager from "./ApiManager";

const ApiLoadGroupChat = {
  getGroupChat: async (token) => {
    const url = `/groupChat/getGroupChat`;
    return await apiGet.get(url, token);
  },

  createGroup: async (token, data) => {
    const url = `/groupChat/createGroup`;
    return await apiGet.post(
      url,
      { nameGroupChat: data.nameGroupChat, memberChat: data.memberChat },
      token
    );
  },

  getMemberGroupChat: async (idGroupChat) => {
    const url = `/groupChat/${idGroupChat}`;
    return await apiGet.get(url, {});
  },

  deleteUserFromGroupChat: async (data) => {
    const url = `/groupChat/deleteUserFromGroupChat`;
    return await apiGet.put(url, data);
  },

  getInforGroupChat: async (idGroup) => {
    const url = `/groupChat/get-info-group/${idGroup}`;
    return await apiGet.get(url, {});
  },
};

export default ApiLoadGroupChat;
