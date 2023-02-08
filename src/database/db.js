import mongoose from "mongoose";

mongoose.set("strictQuery", false);                                                                                                    
const dbConnect = async () =>{
   try {
    await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology: true,});
    console.log("Database connected!");
   } catch (error) {
    console.log(error.message)
   }
}

export default dbConnect;