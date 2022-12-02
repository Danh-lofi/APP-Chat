import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";

const URL = "http://192.168.1.14:3001";
// const link = "http://172.16.20.69:3001";
const link = "https://suar-app.herokuapp.com";

const ApiManager = axios.create({
  //baseURL: "http://localhost:3001", ///api/users
  baseURL: link,
  responseType: "json",
  withCredentials: true,
});

export const apiGet = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: link,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

apiGet.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("config: " + config);
  return config;
});

export default ApiManager;
