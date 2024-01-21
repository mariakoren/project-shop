import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import cors from "cors";
import authRoutes from "./routers/auth.js";
import itemRoutes from "./routers/items.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    } catch (err) {
        throw err
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/item", itemRoutes);



app.listen(8800, () => {
    connect();
    console.log("connected to backend");

})