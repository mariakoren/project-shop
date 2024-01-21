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

// export const updateItem = async (req, res) => {
//     try {
//         const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         }, {new: true})
//         res.status(200).json(updatedItem)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const deleteItem = async (req, res) => {
//     try {
//         await Item.findByIdAndDelete(req.params.id)
//         res.status(200).json("item has been deleted")

//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const getItem = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id)
//         res.status(200).json(item)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const getItems = async (req, res) => {
//     try {
//         const items = await Item.find()
//         res.status(200).json(items)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// }
