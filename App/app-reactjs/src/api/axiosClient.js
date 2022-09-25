import axios from "axios";
import queryString from "query-string";

const URL = "http://localhost:3001";

const axiosClients = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export default axiosClients;
