import mongoose from "mongoose";
const Schema = mongoose.Schema;
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
    // required: true,
    required: false,
  },
  birthDate: {
    type: Date,
    // required: true,
  },
  gender: {
    type: String,
    required: false,
    // required: true,
  },
  introducePersonal: {
    type: String,
    required: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: false,
        // required: true,
      },
    },
  ],
});

const UserModel = mongoose.model("User", User);
export default UserModel;
