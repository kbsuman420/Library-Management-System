import { Router } from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/user.controller.js"



const userrouter = Router();

userrouter.route("/register").post(registerUser);

userrouter.route("/login").post(loginUser)

userrouter.route("/verify").post(verifyEmail)






export { userrouter }

