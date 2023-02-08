import express from "express";
import CommentController from "../controllers/commentController";
import { verifyToken } from "../middlewares/auth";
const commentRoute = express.Router();

commentRoute.post("/create/:id",verifyToken,CommentController.comment);
commentRoute.get("/all",CommentController.allComments);
commentRoute.get("/:id",CommentController.getComment);

export default commentRoute;