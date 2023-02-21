import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    googleId:{type:String},
    username:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,default:'user'}
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;