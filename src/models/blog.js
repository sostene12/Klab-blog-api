import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{type:String},
    image:{type:String},
    description:{type:String},
    author:{type:String},
    likes:{type:Number,default:0}
},{timestamps:true});

const Blog = mongoose.model('Blog',blogSchema);

export default Blog;