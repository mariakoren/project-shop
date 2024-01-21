import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createComment, deleteComment, getComments, updateComment } from "../controllers/comments.js";

const router = express.Router();

//create
router.post("/:id", createComment)
//update
// router.put("/:id", verifyAdmin, updateComment)
// //delete
// router.delete("/:id", verifyAdmin, deleteComment)
// //get all
// router.get("/", getComments)
export default router;
