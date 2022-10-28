import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Chat = new Schema({
  members: {
    type: Array,
  },
},
{
    timestamps: true,
}
);

const ChatModel = mongoose.model("Chat", Chat);
export default ChatModel;