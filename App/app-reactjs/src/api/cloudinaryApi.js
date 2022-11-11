import axiosClient from "./axiosClient";
const cloudinaryApi = {
  cloudinaryUpload: (fileToUpload, accessToken, chatId, type, fileName) => {
    const url = "/cloudinary/upload";
    return axiosClient.post(
      url,
      { data: fileToUpload, chatId, type, fileName },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
};
export default cloudinaryApi;
