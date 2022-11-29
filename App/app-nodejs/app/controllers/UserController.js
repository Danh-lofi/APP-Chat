import UserModel from "../models/User.js";
import mongoose from "mongoose";
const UserController = {
  update: (req, res, next) => {
    const user = req.user;
    let { name, gender, birthDate, avatar } = req.body;
    log;
    name = name ? name : user.name;
    gender = gender ? gender : user.gender;
    birthDate = birthDate ? birthDate : user.birthDate;
    avatar = avatar ? avatar : user.avatar;
    console.log(user);
    console.log(user.name);
    console.log(avatar);
    UserModel.updateOne(
      { _id: user._id },
      {
        name,
        birthDate,
        gender,
        avatar,
      }
    )
      .then(() => {
        res.status(200).send({
          message: "Cập nhật thành công",
          user: {
            name,
            birthDate,
            gender,
            avatar,
          },
        });
      })
      .catch((error) => {
        res.status(400).send({ message: "Cập nhật thất bại!!!", error });
      });
  },

  getProfileUserFromId: async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const data = await UserModel.findById({
      _id: mongoose.Types.ObjectId(id),
    }).select([
      "_id",
      "username",
      "name",
      "birthDate",
      "gender",
      "address",
      "introducePersonal",
      "avatar",
      "coverImg",
      "friends",
      "groups",
    ]);

    if (!data) {
      res.status(500).json("null");
    } else {
      res.status(200).json(data);
    }
  },
};
export default UserController;
