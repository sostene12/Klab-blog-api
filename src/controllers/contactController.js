import Contact from "../models/contact";

class ContactController{
    static async createMessage(req,res){
        try {
            const contact = new Contact(req.body)
            await contact.save();
            return res.status(201).json({status:"success",data:contact});
        } catch (error) {
            return res.status(401).json({status:"error",error:error.message});
        }
    }
}

export default  ContactController;