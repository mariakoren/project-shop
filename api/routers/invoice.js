import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createInvoice, getInvoiceForPerson } from "../controllers/invoice.js";


const router = express.Router();

//create
router.post("/", createInvoice)
router.get("/find", getInvoiceForPerson)
// //update
// router.put("/:id", verifyAdmin, updateItem)
// //delete
// router.delete("/:id", verifyAdmin, deleteItem)
// //get
// router.get("/:id", getItem)
// //get all
// router.get("/", getItems)

export default router;
