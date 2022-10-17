import UserModel from "../models/User.js";
import AuthService from "../Service/AuthService.js";
import * as randToken from "rand-token";
import bcrypt from "bcrypt";
const AutherController = {
  login: async (req, res, next) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    console.log("username: " + username + " password:" + password);

    // Truy xuất db
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).send("Tên đăng nhập không tồn tại!");
    }
    // So sánh password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Mật khẩu không chính xác!");
    }
    // Tạo các biến trong khi tạo accessToken
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    // Data lưu trong AccessToken
    const dataForAccessToken = {
      username,
    };
    // Tạo access token
    const accessToken = await AuthService.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(401)
        .send("Đăng nhập không thành công, vui lòng thử lại.");
    }
    let refreshToken;
    if (!user.refreshToken) {
      refreshToken = randToken.generate(10); //// tạo 1 refresh token ngẫu nhiên
      UserModel.updateOne({ username }, { refreshToken }).then(() =>
        console.log("Updating!!")
      );
    } else {
      refreshToken = user.refreshToken;
    }
    return res.json({
      msg: "Đăng nhập thành công.",
      accessToken,
      refreshToken,
      user,
    });
  },

  register: (req, res, next) => {
    const username = req.body.username.toLowerCase();
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    UserModel.findOne({ username })
      .then((user) => {
        if (user) {
          res.status(409).send("Tài khoản này đã tồn tại!");
        } else {
          const newUser = new UserModel({
            username: username,
            password: hashPassword,
          });
          newUser.save((err) => {
            if (err) {
              return res.status(400).send("Có lỗi khi tạo " + err);
            }
            return res.status(200).send({ username, hashPassword });
          });
        }
      })
      .catch(next);
  },
};
export default AutherController;
