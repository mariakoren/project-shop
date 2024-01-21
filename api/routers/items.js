import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createItem, deleteItem, getItem, getItems, getQuantity, updateItem } from "../controllers/items.js";

const router = express.Router();

//create
router.post("/", verifyAdmin, createItem)
//update
router.put("/:id", verifyAdmin, updateItem)
//delete
router.delete("/:id", verifyAdmin, deleteItem)
//get
router.get("/:id", getItem)
router.get("/avaible/:id", getQuantity)
//get all
router.get("/", getItems)

export default router;
