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
    console.log(user);
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
      _id: user._id,
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

  refreshToken: async (req, res, next) => {
    /*
  - Lấy 1 accessToken mới khi accessToken cũ sắp hết hạn
  - Hoặc đơn giản là lấy lại 1 accessToken
  - FE  cần :
    + Cần accessToken cũ attach từ header
    + refreshToken từ body
  */

    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    console.log(accessTokenFromHeader);
    if (!accessTokenFromHeader) {
      return res.status(400).send("Không tìm thấy access token.");
    }
    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
      return res.status(400).send("Không tìm thấy refresh token.");
    }

    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const accessTokenLife =
      process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

    // Decode access token đó
    const decoded = await AuthService.decodeToken(
      accessTokenFromHeader,
      accessTokenSecret
    );
    if (!decoded) {
      return res.status(400).send("Access token không hợp lệ.");
    }
    console.log(decoded);
    const username = decoded.payload.username; // Lấy username từ payload

    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(401).send("User không tồn tại.");
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      return res.status(400).send("Refresh token không hợp lệ.");
    }
    // Tạo access token mới
    const dataForAccessToken = {
      username,
    };
    const accessToken = await AuthService.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(400)
        .send("Tạo access token không thành công, vui lòng thử lại.");
    }
    return res.json({
      accessToken,
    });
  },

  profile: function (req, res) {
    // Nhận vào accessToken từ Header\
    const user = req.user;
    res.send({ user });
  },
  me: async (req, res) => {
    res.json(req.user);
  },
};
export default AutherController;
