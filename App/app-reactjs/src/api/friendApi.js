import axiosClient from "./axiosClient";

const friendApi = {
  getFriend: (accessToken) => {
    const url = `/friend/get-all-friend`;
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
  // Tìm bạn bè
  findFriend: (username) => {
    const url = `/friend/${username}`;
    return axiosClient.get(url, {});
  },
  // Gửi yêu cầu kết bạn
  requestFriend: (senderId, receiverId) => {
    const url = `/request-friend/send`;
    return axiosClient.post(url, { senderId, receiverId });
  },
  // Lấy danh sách lời mời
  // Tìm bạn bè
  getInvitesFriend: (id) => {
    const url = `/request-friend/${id}`;
    return axiosClient.get(url, {});
  },
  acceptFriend: (idRequest) => {
    const url = `/request-friend/accept`;
    return axiosClient.post(url, { idRequest });
  },
};

export default friendApi;
