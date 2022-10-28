import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";

const ApiManager = axios.create({
  // baseURL: "http://localhost:3001", ///api/users
  baseURL: "http://192.168.1.7:3001", ///api/users
  responseType: "json",
  withCredentials: true,
});

export const apiGet = axios.create({
  // baseURL: "http://localhost:3001", ///api/users
  baseURL: "http://192.168.1.7:3001",
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
