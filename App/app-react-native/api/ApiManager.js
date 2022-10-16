import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://localhost:3000/api/users",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
