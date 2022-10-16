import ApiManager from "./ApiManager";

export const ApiUser = async (data) => {
  try {
    const result = await ApiManager("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const ApiRegisterUser = async (data) => {
  try {
    const result = await ApiManager("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
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
