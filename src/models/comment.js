import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    comment:{type:String},
},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;