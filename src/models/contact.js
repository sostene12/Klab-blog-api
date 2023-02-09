import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    message:{type:String},
    name:{type:String},
    phone:{type:String},
    email:{type:String}
},{timestamps:true});

const Contact = mongoose.model('Contact',contactSchema);

export default Contact;