import UserModel from "../models/User.js";
const UserController = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    UserModel.findOne({ username })
      .then((user) => {
        if (user) {
          if (password === user.password) {
            console.log("login sucess");

            res.send({ message: "login sucess", user: user });
          } else {
            res.send({ message: "wrong credentials" });
          }
        } else {
          res.send("not register");
        }
      })
      .catch(next);
  },
  register: (req, res, next) => {
    const { username, password } = req.body;
    UserModel.findOne({ username }).then((user) => {
      if (user) {
        res.send({ message: "user already exist" });
      } else {
        const user = new UserModel({ username, password });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "sucessfull" });
          }
        });
      }
    });
  },
};
export default UserController;
