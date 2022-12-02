import axios from "axios";
import ApiManager, { apiGet } from "./ApiManager";

// dong tam lai
//
// export const ApiUser = async (data) => {
//   console.log(data);
//   try {
//     const result = await ApiManager("/login", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       // data: data,
//       body: JSON.stringify(data),
//     });

//     // const result = fetch(`http://localhost:3000/api/users/login`, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(data),
//     // });

//     return result;
//   } catch (error) {
//     return error.response.data;
//   }
// };

export const ApiUser = {
  login: (data) => {
    const url = `/login`;
    return ApiManager.post(url, data);
  },

  getAllUser: async (id) => {
    return await ApiManager.get(`/getAllUser/${id}`, {});
  },
};

// export const ApiRegisterUser = async (data) => {
//   try {
//     const result = await ApiManager("/register", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       data: data,
//     });
//     return result;
//   } catch (error) {
//     return error.response.data;
//   }
// };

export const ApiRegisterUser = {
  checkExistAccount: (data) => {
    const url = `/checkExistAccount`;
    return ApiManager.post(url, data);
  },

  register: (data) => {
    const url = `/register`;
    return ApiManager.post(url, data);
  },
};

export const ApiProfile = {
  //async (token) =>

  profile: (token) => {
    const url = `/me`;
    // return ApiManager.get(url, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    return axios.create({
      baseURL: "http://192.168.1.14:3001/me",
      // baseURL: "http://localhost:3001/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  profile2: async (token) => {
    return await apiGet.get(`/me`, token);
  },
};

export const ApiGetUser = {
  getProfileUserFromId: (id) => {
    const url = `/user/getProfileUserFromId/${id}`;
    return apiGet.get(url, {});
  },
};

export const TestGetFromHeroku = {
  getTest: (id) => {
    const url = `https://suar-app.herokuapp.com/user/getProfileUserFromId/${id}`;
    return apiGet.get(url, {});
  },
};
