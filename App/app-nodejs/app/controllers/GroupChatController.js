import mongoose, { mongo } from "mongoose";
import GroupChatModel from "../models/GroupChat.js";
import UserModel from "../models/User.js";

const GroupChatController = {
  createGroupChat: async (req, res, next) => {
    const nameGroupChat = req.body.nameGroupChat;
    const adminGroup = req.body.adminGroup;
    const memberChat = req.body.memberChat;

    if (memberChat.length < 3) {
      return res.status(400).send("Nhóm chat phải từ từ3 thành viên trở lên!");
    }

    const groupChat = new GroupChatModel({
      nameGroupChat: nameGroupChat,
      adminGroup: adminGroup,
      memberChat: memberChat,
    });

    try {
      const rs = await groupChat.save();
      req.body.idGroupChat = rs._id;
      req.body.listIdUser = rs.memberChat;
      next();
    } catch (error) {
      res.status(406).json(error);
    }
  },

  getGroupChat: async (req, res) => {
    const user = req.user;
    console.log(user);
    const listGroup = [];
    for (const group of user.groups) {
      const id = mongoose.Types.ObjectId(group.id);
      const data = await GroupChatModel.findOne({ _id: id });
      listGroup.push(data);
    }
    res.status(200).json({ listGroup });
  },

  updateGroupChatInUser: async (req, res) => {
    const listIdUser = req.body.listIdUser;
    const idGroupChat = req.body.idGroupChat;
    console.log(idGroupChat);
    console.log(listIdUser);
    const oGroups = { id: idGroupChat };
    // const idUser = req.body.idUser;
    for (const idUser of listIdUser) {
      try {
        const rs = await UserModel.findOneAndUpdate(
          { _id: idUser.id },
          { $push: { groups: oGroups } }
        );

        // res.status(200).json({ rs, message: "Thanh cong" });
      } catch (error) {
        res.status(407).json({ error, message: "Khong thanh cong" });
      }
      
    }
    res.status(200).json({ message: "Thanh cong" });

    // UserModel.findOneAndUpdate(
    //   { _id: idUser },
    //   { $push: { groups: oGroups } },
    //   function (error, success) {
    //     if (error) {
    //       console.log("Khong thanh cong: " + error);
    //     } else {
    //       console.log("Thanh cong " + success);
    //     }
    //   }
    // );
  },
  deleteGroupChat: async (req,res) =>{
    const user = req.user;
    const meId = user._id;
    const groupId = req.body.groupId;
    const groupChat = await GroupChatModel.findOne({_id : groupId});
    const _groupId = groupChat._id
    const groupChatAdminId = groupChat.adminGroup;
    const userDeleteId = req.body.userDeleteId;
    try {
      if(meId == groupChatAdminId){
        await GroupChatModel.findOneAndUpdate({_id: groupId},{ $pull: { memberChat: {id: userDeleteId} } });
        await UserModel.findOneAndUpdate({_id: userDeleteId},{ $pull: { groups: {id: _groupId} } });
        res.status(200).send("groupId: " + groupId + "+" + "admin: " +  groupChatAdminId + "+" + "id bi xoa: " + userDeleteId)
      }else{
        res.send("ban khong phai admin")
      }
    } catch (error) {
      console.log("loi");
    }
  },
  leaveGroup: async (req,res) => {
    const user = req.user;
    const meId = user._id;
    const groupId = req.body.groupId;
    const groupChat = await GroupChatModel.findOne({_id : groupId});
    const _groupId = groupChat._id
    const groupChatAdminId = groupChat.adminGroup;
    const newAdminId = req.body.newAdminId;
    try {
      if(meId == groupChatAdminId){
        await GroupChatModel.findOneAndUpdate({_id: groupId},{ $pull: { memberChat: {id: meId} } });
        await UserModel.findOneAndUpdate({_id: meId},{ $pull: { groups: {id: _groupId} } });
        await GroupChatModel.findOneAndUpdate({_id: groupId},{ adminGroup: newAdminId } );
        res.status(200).send("admin da roi khoi nhom va admin moi la: " + "newAdminId");
      }if(meId != groupChatAdminId){
        await GroupChatModel.findOneAndUpdate({_id: groupId},{ $pull: { memberChat: {id: meId} } });
        await UserModel.findOneAndUpdate({_id: meId},{ $pull: { groups: {id: _groupId} } });
      }
    } catch (error) {
      console.log("loi");
    }
  }
};

export default GroupChatController;
