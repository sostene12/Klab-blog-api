import express from "express";

import BlogController from "../controllers/blogController";
import { verifyToken,verifyTokenAndRole } from "../middlewares/auth";
import {upload} from "../helpers/multer";

const blogRoute = express.Router();

blogRoute.post("/create",upload.single('image'),verifyTokenAndRole,BlogController.createBlog);
blogRoute.get("/all",BlogController.getAllBlogs);
blogRoute.get("/:id",BlogController.singleBlog);
blogRoute.delete("/delete/:id",verifyTokenAndRole,BlogController.deleteBlog);
blogRoute.put("/update/:id",upload.single('image'),verifyTokenAndRole,BlogController.updateBlog);
blogRoute.put("/like/:id",verifyToken,BlogController.like);

export default blogRoute;