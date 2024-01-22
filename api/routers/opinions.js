import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import {createOpinion, deleteOpinion, getOpinions, updateOpinion} from "../controllers/opinions.js";
const router = express.Router();

//CREATE
router.post("/", createOpinion)

//GET ALL
router.get("/", getOpinions)

//update
router.put("/:id", updateOpinion)
//delete
router.delete("/:id", deleteOpinion)
export default router;