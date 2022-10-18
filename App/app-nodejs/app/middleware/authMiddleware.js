import UserModel from "../models/User.js";
import AuthService from "../Service/AuthService.js";

const authMiddleware = {
  isAuth: async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;

    if (!accessTokenFromHeader) {
      return res.status(401).send("Không tìm thấy access token!");
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await AuthService.verifyToken(
      accessTokenFromHeader,
      accessTokenSecret
    );
    if (!verified) {
      return res
        .status(401)
        .send("Bạn không có quyền truy cập vào tính năng này!");
    }

    const user = await UserModel.findOne({
      username: verified.payload.username,
    });

    req.user = user;

    return next();
  },
  authApp: async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
      const user = await User.findOne({ _id: data._id, "tokens.token": token });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ error: "Không được phép truy cập tài nguyên này1" });
    }
  },
};
export default authMiddleware;
