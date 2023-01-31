import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{type:String},
    likes:{type:Number}
},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;