import express from "express";
import ContactController from "../controllers/contactController";

const contactRoute = express.Router();

contactRoute.post("/create",ContactController.createMessage);

export default contactRoute