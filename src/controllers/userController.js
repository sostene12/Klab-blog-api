import bcrypt from "bcrypt";

import User from "../models/user";
import { sign } from "../helpers/jwt";
import { successMessage,errorMessage } from "../helpers/resMesaages";

class UserController{
    static async signup(req,res){
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
            const user = await User.create(req.body)
            const token = sign({id:user._id,role:user.role});
            res.status(201).json({status:"success",data:user,token});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    }

    static async login(req,res){
        try {
            const user = await User.findOne({email:req.body.email});
            if(!user) return res.status(401).json({status:"error",error:"User not exist"});
            const passwordMatch = await bcrypt.compare(req.body.password,user.password);
            if(!passwordMatch){
                return res.status(401).json({status:"error",error:"Invalid password"});
            }
            const token = sign({id:user._id,role:user.role});
            return res.status(200).json({status:"success",data:user,token})

        } catch (error) {
            errorMessage(res,400,error);
        }
    }

    static async allUsers(req,res){
        try {
            const users = await User.find();
            if(!users) errorMessage(res,404,"no users found");
            successMessage(res,200,users);
        } catch (error) {
            errorMessage(res,400,error);
        }
    }

    static async singleUser(req,res){
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(404).json({status:"error",error:"not found"});
            return res.status(200).json({status:"success",data:user})
        } catch (error) {
            return res.status(200).json({status:"error",error:error.message});
        }
    }

    static async updateUser(req,res){
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(404).json({status:"error",error:"not found"});
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.status(200).json({status:"success",data:updatedUser})
        } catch (error) {
            return res.status(200).json({status:"error",error:error.message});
        }
    }

    static async deleteUser(req,res){
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(404).json({status:"error",error:"not found"});
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({status:"success",data:null,message:"user deleted!"})
        } catch (error) {
            return res.status(200).json({status:"error",error:error.message});
        }
    }
}

export default UserController;