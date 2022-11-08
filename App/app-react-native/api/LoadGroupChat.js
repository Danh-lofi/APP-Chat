import { apiGet } from "./ApiManager";

const ApiLoadGroupChat = {
  getGroupChat: async (token) => {
    const url = `/groupChat/getGroupChat`;
    return await apiGet.get(url, token);
  },

  createGroup: async (data) => {
    const url = `/groupChat/createGroup`;
    return await apiGet.post(url, data);
  },
};

export default ApiLoadGroupChat;
