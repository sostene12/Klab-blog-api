import express from "express";
import EstateController from "../controllers/estateController";
import { upload } from "../helpers/multer";
const estateRoute = express.Router();

estateRoute.get("/all",EstateController.getAllEstate);
estateRoute.get("/:id",EstateController.getEstate);
estateRoute.post("/create",upload.array('image'),EstateController.createEstate);
estateRoute.delete("/delete/:id",EstateController.deleteEstate);
estateRoute.put("/update/:id",upload.array('image'),EstateController.updateEstate);

export default estateRoute;