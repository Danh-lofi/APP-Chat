const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
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
  },
  gender: {
    type: String,
    required: true,
  },
  introducePersonal: {
    type: String,
    required: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// băm password trước khi lưu
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// tạo ra token
userSchema.methods.generateAuthToken = async function () {
  // phuong thuc duoc dinh nghia tren model, duoc tao ra boi schema static
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// tìm xem user có tồn tại không bằng username(số điện thoại)
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: "Thông tin đăng nhập không hợp lệ !" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Thông tin đăng nhập không hợp lệ !" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
