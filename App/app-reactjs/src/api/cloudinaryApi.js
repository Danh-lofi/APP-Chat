import axiosClient from "./axiosClient";
const cloudinaryApi = {
  cloudinaryUpload: (
    fileToUpload,
    accessToken,
    chatId,
    type,
    fileName,
    isFileWord,
    isFilePdf,
    isFilePowP,
    isFileExel
  ) => {
    const url = "/cloudinary/upload";
    return axiosClient.post(
      url,
      {
        data: fileToUpload,
        chatId,
        type,
        fileName,
        isFileWord,
        isFilePdf,
        isFilePowP,
        isFileExel,
      },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
};
export default cloudinaryApi;
