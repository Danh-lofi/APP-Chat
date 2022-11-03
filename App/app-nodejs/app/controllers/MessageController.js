import MessageModel from "../models/Message.js";

const MessageController = {
  // [POST] /message/
  addMessage: async (req, res) => {
    const { chatId, senderId, content } = req.body;
    const message = new MessageModel({
      chatId,
      senderId,
      content,
    });
    try {
      const result = await message.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /message/:chatId
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
