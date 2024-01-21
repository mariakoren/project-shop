import Item from "../models/item.js";
import Comments from "../models/comment.js";

export const createItem = async (req, res) => {
    const newItem = new Item(req.body)
    try {
        const savedItem = await newItem.save()
        res.status(200).json(savedItem)

    } catch (err) {
        res.status(500).json(err)
    }
}
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedItem)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.status(200).json("item has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json(items)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getQuantity = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item.avaible)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getComments = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const comments = await Comments.find({ _id: { $in: item.comments } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}