import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createInvoice, deleteInvoice, getInvoiceForPerson, getInvoices } from "../controllers/invoice.js";


const router = express.Router();

//create
router.post("/", createInvoice)
router.get("/find", getInvoiceForPerson)
router.delete("/:id", verifyAdmin, deleteInvoice);
router.get("/", getInvoices);



export default router;
