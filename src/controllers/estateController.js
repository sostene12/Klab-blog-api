import cloudinary from "../helpers/cloudinary";
import Estate from "../models/estate";

class EstateController {
  static async getAllEstate(req, res) {
    try {
      const estates = await Estate.find();
      return res.status(200).json({ status: "success", data: estates });
    } catch (error) {
      return res.status(401).json({ status: "error", error: error.message });
    }
  }

  static async createEstate(req, res) {
    try {
      const files = req.files;
      const urls = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        urls.push(result.secure_url);
      }

      const estate = new Estate({
        image: urls,
        location: {
          province: req.body.province,
          district: req.body.district,
          street: req.body.street,
        },
        price: req.body.price,
        beds: req.body.beds,
        bath: req.body.bath,
        yearBuilt: req.body.yearBuilt,
        lotSize: req.body.lotSize,
        status: req.body.status,
        description: req.body.description,
      });

      await estate.save();
      return res.status(201).json({ status: "success", data: estate });
    } catch (error) {
      return res.status(401).json({ status: "error", error: error.message });
    }
  }

  static async deleteEstate(req, res) {
    try {
      const estate = await Estate.findById(req.params.id);

      if (!estate) {
        return res
          .status(404)
          .json({ status: "fail", message: "estate not found" });
      }
      if(estate.image){
        for(let image in estate.image){
            await cloudinary.uploader.destroy(image)
        }
    }
      await Estate.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ status: "success", message: "deleted", data: null });
    } catch (error) {
      return res.status(401).json({ status: "error", error: error.message });
    }
  }

  static async getEstate(req,res){
    try {
        const estate = await Estate.findById(req.params.id);
        if (!estate) {
        return res
          .status(404)
          .json({ status: "fail", message: "estate not found" });
        }
        return res.status(200).json({status:"success",data:estate});
        
    } catch (error) {
        return res.status(401).json({ status: "error", error: error.message });
    }
  }

  static async updateEstate(req,res){
    try {
        const estate = await Estate.findById(req.params.id);
        if (!estate) {
            return res
              .status(404)
              .json({ status: "fail", message: "estate not found" });
            }
        if(estate.image){
            for(let image in estate.image){
                await cloudinary.uploader.destroy(image)
            }
        }
        const files = req.files;
        const urls = [];
        for (const file of files) {
          const result = await cloudinary.uploader.upload(file.path);
          urls.push(result.secure_url);
        }
        
        const updatedEstate =  await Estate.findByIdAndUpdate(req.params.id,{$set:{
            image: urls,
            location: {
              province: req.body.province,
              district: req.body.district,
              street: req.body.street,
            },
            price: req.body.price,
            beds: req.body.beds,
            bath: req.body.bath,
            yearBuilt: req.body.yearBuilt,
            lotSize: req.body.lotSize,
            status: req.body.status,
            description: req.body.description,
        }},{new:true});
        return res.status(200).json({status:"success",data:updatedEstate});
    } catch (error) {
        return res.status(401).json({ status: "error", error: error.message });
    }
  }

}

export default EstateController;
