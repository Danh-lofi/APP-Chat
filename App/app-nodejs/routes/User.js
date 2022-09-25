import express from "express";
import UserController from "../app/controllers/UserController.js";
const routerUser = express.Router();
routerUser.post("/login", UserController.login);
routerUser.post("/register", UserController.register);
export default routerUser;
