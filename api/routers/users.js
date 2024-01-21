import express from "express";
import User from "../models/user.js";
import {deleteUser, getUser, getallUser, updatedUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updatedUser)
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser, getUser)
//GET ALL
router.get("/", verifyAdmin, getallUser)
export default router;