import { apiGet } from "./ApiManager";

const ApiLoadFriend = {
  getFriend: async (token) => {
    const url = `/friend`;
    return await apiGet.get(url, token);
  },
};

export default ApiLoadFriend;
