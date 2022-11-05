import axiosClient from "./axiosClient";
const cloudinaryApi = {
  cloudinaryUpload: (fileToUpload, accessToken, chatId) => {
    const url = "/cloudinary/upload";
    // fileToUpload = JSON.stringify({ data: fileToUpload, chatId: "chatId" });
    // console.log({ data: fileToUpload });
    return axiosClient.post(
      url,
      { data: fileToUpload, chatId },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
};
export default cloudinaryApi;
