import MessageModel from "../models/messageModel.js";

const MessageController = {
  addMessage: async (req, res) => {
    // const { chatId, senderId, text } = req.body;
    const chatId = req.body.chatId;
    const senderId = req.body.senderId;
    const text = req.body.text;
    console.log(text);
    const message = new MessageModel({
      chatId: chatId,
      senderId: senderId,
      text: text,
    });
    message.save((err) => {
      if (err) {
        return res.status(405).send("Khong gui duoc tin nhan " + err);
      }
      const rs = { chatId, senderId, text };
      return res.status(200).json({ rs });
    });
    // try {
    //   const result = await message.save();
    //   res.status(200).json({ chatId, senderId, text });
    // } catch (error) {
    //   res.status(500).json(error);
    // }
  },
  getMessages: async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await MessageModel.find({ chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default MessageController;
