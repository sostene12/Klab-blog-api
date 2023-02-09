import Blog from "../models/blog";
import cloudinary from "../helpers/cloudinary";
import Comment from "../models/comment";

class BlogController {
  static async createBlog(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        image: result.secure_url,
        author:req.user.id
      });
      await blog.save();
      res.status(201).json({ status: "success", data: blog });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
    }
  }

  static async getAllBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      res.status(200).json({ status: "success", data: blogs });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
    }
  }

  static async singleBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      const comment = await Comment.find({blogId:req.params.id});
      if (!blog) {
        return res
          .status(404)
          .json({ status: "fail", error: "blog not found" });
      }
      res.status(200).json({ status: "success", data: {blog,comment} });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
    }
  }

  static async deleteBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res
          .status(404)
          .json({ status: "fail", error: "blog not found" });
      }
      if(blog.image){
        await cloudinary.uploader.destroy(blog.image);
      }
      await Blog.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ status: "success", data: null, message: "Blog deleted" });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
    }
  }

  static async updateBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res
          .status(404)
          .json({ status: "fail", error: "blog not found" });
      }
      await cloudinary.uploader.destroy(blog.image);
      const result = await cloudinary.uploader.upload(req.file.path);
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title ? req.body.title : blog.title,
            image: result.secure_url,
            description: req.body.description
              ? req.body.description
              : blog.description,
          },
        },
        { new: true }
      );
      res.status(200).json({ status: "success", data: updatedBlog });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
    }
  }
  static async like(req,res){
    try {
      const {likes} = await Blog.findByIdAndUpdate(req.params.id,{$inc: {likes:1}},{new:true});
      return res.status(200).json({status:"success",likes})
    } catch (error) {
      return res.status(400).json({ status: "error", error: error.message });
    }
  }
}

export default BlogController;
