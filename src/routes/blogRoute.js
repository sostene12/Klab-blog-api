import express from "express";

import BlogController from "../controllers/blogController";
import { verifyToken,verifyTokenAndRole } from "../middlewares/auth";
import {upload} from "../helpers/multer";

const blogRoute = express.Router();

blogRoute.post("/create",upload.single('image'),BlogController.createBlog);
blogRoute.get("/all",BlogController.getAllBlogs);
blogRoute.get("/:id",BlogController.singleBlog);
blogRoute.delete("/delete/:id",BlogController.deleteBlog);
blogRoute.put("/update/:id",upload.single('image'),BlogController.updateBlog);

export default blogRoute;