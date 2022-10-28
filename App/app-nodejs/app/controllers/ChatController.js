import ChatModel from "../models/Chat.js";

const ChatController = {

    // [POST] /chat/
    createChat : async(req,res) => {
        const NewChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId]
        });

        try {
            const result = await NewChat.save();
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // [GET] /chat/:userId
    userChats: async(req,res) => {
        try {
            const chat = await ChatModel.find({
                members : {$in: [req.params.userId]}
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // [GET] /chat/find/:firstId/:secondId
    findChat: async(req,res) => {
        try {
            const chat = await ChatModel.findOne({
                members : {$all: [req.params.firstId, req.params.secondId]}
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
}

export default ChatController;