import express from "express";
import UserController from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/signup",UserController.signup);
userRoute.post("/login",UserController.login);
userRoute.get("/all",UserController.allUsers);
userRoute.get("/:id",UserController.singleUser)

export default userRoute;