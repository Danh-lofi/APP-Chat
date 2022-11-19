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
  deleteFriend: async (req, res) => {
    // Input: friendId, accessToken
    const user = req.user;
    const meId = user._id.toString();
    const friendId = req.body.friendId;
    console.log("friendId: " + friendId);
    console.log("MeId: ");
    console.log(meId.toString());
    try {
      const userMe = await UserModel.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: { id: meId } } }
      );
      const userFriend = await UserModel.findOneAndUpdate(
        { _id: meId },
        { $pull: { friends: { id: friendId } } }
      );
    } catch (error) {
      return res.status(402).send({ message: "Xóa thất bại!!!" });
    }
    res.status(200).send({ message: "Xóa thành công!!!" });
  },
  getUserByUsername: async (req, res) => {
    const username = req.params.username;

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      res.status(404).send(user);
      return;
    }

    res.status(200).send(user);
  },
};

export default FriendController;
