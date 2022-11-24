import ApiManager, { apiGet } from "./ApiManager";

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
    return apiGet.post(
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

  upLoad: (dataImg) => {
    console.log(dataImg);
    const url = "/cloudinary/upload";
    return apiGet.post(url, dataImg);
  },
};
export default cloudinaryApi;
