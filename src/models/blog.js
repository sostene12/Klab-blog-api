import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{type:String},
    image:{type:String},
    description:{type:String},
    // comments:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Comment'
    // }
},{timestamps:true});

const Blog = mongoose.model('Blog',blogSchema);

export default Blog;