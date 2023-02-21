import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import dbConnect from "./database/db";
import blogRoute from "./routes/blogRoute";
import userRoute from "./routes/userRoute";
import swaggerDocs from "./api-docs/swagger";
import commentRoute from "./routes/commentRoute";
import contactRoute from "./routes/contactRoute";
import estateRoute from "./routes/estateRoute";
import authRoute from "./routes/auth";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({origin:"*"}));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.MONGODB_URL})
}))
app.use(passport.initialize());
app.use(passport.session())

const PORT = process.env.PORT ? process.env.PORT : 3001;

dbConnect();
app.listen(PORT,() => console.log(`App is listening on port: ${PORT}`));

app.use("/api/blog",blogRoute);
app.use("/api/user",userRoute);
app.use("/api/comment",commentRoute);
app.use("/api/contact",contactRoute)
app.use("/api/estate",estateRoute)
app.use("/auth",authRoute);
app.use(errorHandler);

swaggerDocs(app);