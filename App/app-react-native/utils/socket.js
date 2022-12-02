import { io } from "socket.io-client";
// const socket = io.connect("http://172.16.20.69:3001");
const socket = io.connect("https://suar-app.herokuapp.com");
export default socket;
