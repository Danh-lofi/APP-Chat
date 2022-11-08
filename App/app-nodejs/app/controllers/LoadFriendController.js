import UserModel from "../models/User.js";
import mongoose from "mongoose";

const LoadFriendController = {
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
};

export default LoadFriendController;
