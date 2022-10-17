import express from "express";
import UserController from "../app/controllers/AuthController.js";
const routerAuth = express.Router();
routerAuth.post("/login", UserController.login);
routerAuth.post("/register", UserController.register);
export default routerAuth;
