import axios from "axios";
import axiosClient from "./axiosClient";

const userApi = {
  changeProfile: (accessToken, data) => {
    const url = "/user/update";
    return axiosClient.post(
      url,
      {
        data: data.avatar,
        type: data.type,
        fileName: data.fileName,
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
      },
      {
        headers: {
          x_authorization: accessToken,
        },
      }
    );
  },
};

export default userApi;
