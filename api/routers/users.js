import express from "express";
import User from "../models/user.js";
import {deleteUser, getUser, getUsers, updatedUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyAdmin, updatedUser)
//DELETE
router.delete("/:id",verifyAdmin, deleteUser)
//GET
router.get("/:id",verifyAdmin, getUser)
//GET ALL
router.get("/", verifyAdmin, getUsers)
export default router;