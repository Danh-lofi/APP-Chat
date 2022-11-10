import UserModel from "../models/User.js";
import mongoose from "mongoose";

const FriendController = {
  findUser: async (req, res) => {
    const { friendId } = req.params;
    const user = req.user;
    console.log(friendId);
    const isFriend = user.friends.find((friend) => friend.id === friendId);
    if (isFriend) {
      const id = mongoose.Types.ObjectId(friendId);
      const friend = await UserModel.findOne({ _id: id });
      res.status(200).json({ friend });
    } else {
      res.status(402).send("Không tìm thấy!!!");
    }
  },
  getAllFriend: async (req, res) => {
    // const { friendId } = req.params;
    const user = req.user;
    const listFriend = [];
    for (const friend of user.friends) {
      const id = mongoose.Types.ObjectId(friend.id);
      const data = await UserModel.findOne({ _id: id });
      listFriend.push(data);
    }
    res.status(200).json({ listFriend });
  },
  deleteFriend: async (req,res) => {
    const user = req.user;
    const meId = user._id
    const friendId = req.body.friendId;
    try {
       await UserModel.findOneAndUpdate({_id: meId},{ $pull: { friends: {id: friendId} } });
       await UserModel.findOneAndUpdate({_id: friendId},{ $pull: { friends: {id: meId} } });
    } catch (error) {
      console.log("loi");
    }
  },
  getUserByUsername: async (req,res) =>{
    const username = req.params.username;
    try {
      const user = await UserModel.findOne({username: username});
      res.send(user)
    } catch (error) {
      res.send("khong tim thay user nay")
    }
  },
};

export default FriendController;
