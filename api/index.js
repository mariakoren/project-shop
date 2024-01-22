import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routers/auth.js";
import itemRoutes from "./routers/items.js";
import invoiceRoutes from "./routers/invoice.js";
import commentRoutes from "./routers/comments.js";
import userRoutes from "./routers/users.js";
import cookieParser from "cookie-parser";
import opinionRoutes from "./routers/opinions.js";
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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/buy", invoiceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opinions", opinionRoutes);



// const SseChannel = require('sse-channel');
import SseChannel from 'sse-channel';
import ads from './ads.js';
const dateChannel = new SseChannel();


app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
 res.setHeader("Connection", "keep-alive");
 res.setHeader("Cache-Control", "no-cache");
 res.setHeader("Content-Type", "text/event-stream");
 next();
});

app.use(function(req, res) {
 if (req.url.indexOf('/events/datetime') === 0) {
  dateChannel.addClient(req, res);
 } else {
  res.writeHead(404);
  res.end();
 }
});

setInterval(function broadcastDate() {
  const randomIndex = Math.floor(Math.random() * ads.length);
  const ad = ads[randomIndex].description;
dateChannel.send(JSON.stringify({ message: ad }));
}, 10000);

app.listen(8800, () => {
    connect();
    console.log("connected to backend");

})