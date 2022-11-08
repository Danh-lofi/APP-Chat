import RequestFriendModel from "../models/requestFriend.js";

const RequestFriendController = {
  getListRequest: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const listRequest = await RequestFriendModel.find({ senderId: id });
    res.send(listRequest);
  },
};

export default RequestFriendController;
