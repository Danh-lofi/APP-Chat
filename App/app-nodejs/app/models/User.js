import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    // required: true,
    default: Date.now(),
  },
  gender: {
    type: String,
    required: true,
  },
  introducePersonal: {
    type: String,
    required: true,
  },
  listFriends: [
    {
      sdt: {
        type: String,
        required: false,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: false,
        // required: true,
      },
    },
  ],
  refreshToken: {
    type: String,
    required: false,
  },
});

User.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});

const UserModel = mongoose.model("User", User);
export default UserModel;
