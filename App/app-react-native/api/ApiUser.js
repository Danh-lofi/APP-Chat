import ApiManager from "./ApiManager";

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
  register: (data) => {
    const url = `/register`;
    return ApiManager.post(url, data);
  },
};

export const ApiProfile = async (token) => {
  try {
    const result = await ApiManager("/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

// const onLoggedIn = token => {
//   fetch(`${API_URL}/private`, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//       },
//   })
//   .then(async res => {
//       try {
//           const jsonRes = await res.json();
//           if (res.status === 200) {
//               setMessage(jsonRes.message);
//           }
//       } catch (err) {
//           console.log(err);
//       };
//   })
//   .catch(err => {
//       console.log(err);
//   });
// }
