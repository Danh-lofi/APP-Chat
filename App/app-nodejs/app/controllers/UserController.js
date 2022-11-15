import UserModel from "../models/User.js";
const UserController = {
  update: (req, res, next) => {
    const user = req.user;
    let { name, gender, birthDate, avatar } = req.body;
    name = name ? name : user.name;
    gender = gender ? gender : user.gender;
    birthDate = birthDate ? birthDate : user.birthDate;
    avatar = avatar ? avatar : user.avatar;

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
            ...user._doc,
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
  getListUserFromId: async (req, res) => {
    console.log("Get List User From Id: ");
    // Mảng chứa thông tin user từ id
    const listUser = [];
    const listUserId = req.listIdUser;
    console.log("listUserId: " + listUserId);
    try {
      for (const user of listUserId) {
        const id = user.id;
        const idRequest = user.idRequest;
        console.log("idRequest: " + idRequest);
        const data = await UserModel.findOne({ _id: id });
        data.idRequest = idRequest;
        listUser.push(data);
      }
      // Trả về list user
      console.log("----------End: getListUserFromId ------------------");
      res.status(200).json({ listUser });
    } catch (error) {
      res.status(402).send(error);
    }
  },
};
export default UserController;
