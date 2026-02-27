import express from "express";
import { logIn, deleteUser, signUp } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.post("/login", logIn);
userRouter.post("/signup", signUp);
userRouter.delete("/deleteuser", deleteUser)

export default userRouter;