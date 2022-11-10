import RequestFriendModel from "../models/requestFriend.js";
import UserModel from "../models/User.js";
const RequestFriendController = {
  getListRequest: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const listRequest = await RequestFriendModel.find({ receiverId: id });
    res.send(listRequest);
  },
  acceptFriend: async (req,res) => {
    const idRequest = req.body.idRequest;
    const listId = await RequestFriendModel.findOne({_id: idRequest})
    console.log(listId);
    const senderId = listId.senderId;
    const receiverId = listId.receiverId;
    res.send(senderId + "+" + receiverId)
    try {
      const Result1 = await UserModel.findOneAndUpdate({_id: senderId},{ $push: { friends: {id: receiverId} } });
      const Result2 = await UserModel.findOneAndUpdate({_id: receiverId},{ $push: { friends: {id: senderId }} });
      await RequestFriendModel.deleteOne({_id: idRequest})
    } catch (error) {
      console.log("loi");
    }
  },
  //tu choi ne
  declineFriend: async(req,res) => {
    const idRequest = req.body.idRequest;
    await RequestFriendModel.deleteOne({_id: idRequest})
  },
  sendRequestFriend: async(req,res) =>{
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const request = new RequestFriendModel({senderId,receiverId})
    const a = await request.save()
    res.send(a)
  }
};

export default RequestFriendController;
