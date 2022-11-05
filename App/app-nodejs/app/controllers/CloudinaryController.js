import cloudinary from "../../config/cloudynary/cloudinary.config.js";
import cloudinaryConfig from "../../config/cloudynary/cloudinary.config.js";
import UploadedFile from "../models/File.js";

const CloudinaryController = {
  images: async (req, res, next) => {
    const { resources } = await cloudinaryConfig.v2.search
      .expression("folder: Danh")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  },
  upload: async (req, res, next) => {
    try {
      console.log(req.body.chatId);
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
        folder: "Danh",
        upload_preset: "ml_default",
      });

      req.body.senderId = req.user.id;
      req.body.text = uploadResponse.url;
      req.body.isImg = true;
      req.body.chatId = req.body.chatId;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  },
};

export default CloudinaryController;
