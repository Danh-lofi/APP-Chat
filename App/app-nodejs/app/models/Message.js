import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    chatId:{
      type: String,
    },
    senderId:{
      type: String,
    },
    content:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", MessageSchema);
export default MessageModel;