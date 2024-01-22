import Invoice from "../models/invoice.js";
import Item from '../models/item.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const createInvoice = async (req, res) => {
    const { itemDetails } = req.body;

    try {
        const { itemId, quantity } = itemDetails;
        const selectedItem = await Item.findById(itemId);
        if (!selectedItem) {
            return res.status(404).json({ error: "Nie znaleziono przedmiotu o podanym ID." });
        }
        if (selectedItem.avaible < quantity) {
            return res.status(400).json({ error: `Nie można dokonać zakupu, dostępna ilość: ${selectedItem.avaible}` });
        }
       const newInvoice = new Invoice(req.body);
        const savedInvoice = await newInvoice.save();
        await Item.updateOne(
            { _id: itemId },
            { $inc: { avaible: -quantity } } 
        );

        res.status(200).json(savedInvoice);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getInvoiceForPerson = async (req, res) => {
    const userIdParam = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(userIdParam)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    try {
        const user = await User.findById(userIdParam);
        if (!user) {
            return res.status(404).json({ message: 'Nie istnieje użytkownik o podanym ID.' });
        }
        const invoices = await Invoice.find({ userId: userIdParam });
        if (invoices.length === 0) {
            return res.status(404).json({ message: 'W tej chwili nie masz żadnych zakupów.' });
        }
        res.status(200).json(invoices);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd podczas przetwarzania zapytania.' });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        if (invoices.length === 0) {
            return res.status(404).json({ message: 'W tej chwili nie ma żadnych zakupów.' });
        }
        res.status(200).json(invoices);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Błąd podczas przetwarzania zapytania.' });
    }
};





export const deleteInvoice = async (req, res) => {
    const { id: invoiceId } = req.params;
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
        if (!deletedInvoice) {
            return res.status(404).json({ error: "Nie znaleziono faktury o podanym ID." });
        }
        const { itemDetails } = deletedInvoice;
        const { itemId, quantity } = itemDetails;
        await Item.updateOne(
            { _id: itemId },
            { $inc: { avaible: quantity } }
        );
        res.status(200).json({ message: "Faktura usunięta pomyślnie." });
    } catch (err) {
        res.status(500).json(err);
    }
};

