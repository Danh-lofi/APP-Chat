import UserModel from "../models/User.js";
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
};
export default UserController;
