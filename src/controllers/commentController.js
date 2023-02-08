import Comment from "../models/comment";

class CommentController{
    static async comment(req,res){
        try {
            const comment = new Comment({
                userId:req.user.id,
                comment:req.body.comment,
                blogId:req.params.id,
            })
            await comment.save();
            return res.status(201).json({status:"success",comment:comment})
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }

    static async allComments(req,res){
        try {
            const comments = await Comment.find();
            return res.status(200).json({status:"success",data:comments})
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }

    static async getComment(req,res){
        try {
            const comments = await Comment.findById(req.params.id);
            return res.status(200).json({status:"success",data:comments})
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }

    static async deleteComment(req,res){
        try {
            await Comment.findOneAndDelete(req.params.id);
            return res.status(200).json({status:"success",message:"deleted"});
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }

    static async updateComment(req,res){
        try {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            return res.status(200).json({status:"success",data:updatedComment})
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }
}

export default CommentController;