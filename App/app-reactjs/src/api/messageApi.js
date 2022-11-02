import axiosClient from "./axiosClient";
const messageApi = {
  addMessage: (message) => {
    const url = "messages";
    return axiosClient.post(url, message);
  },
  getMessages: (chatId) => {
    const url = `messages/${chatId}`;
    return axiosClient.get(url, {});
  },
};
export default messageApi;
