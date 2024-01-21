import Comments from "../models/comment.js";
import Item from "../models/item.js";

export const createComment = async (req, res) => {
    const itemId = req.params.id;
    const newComment = new Comments(req.body);
    try {
        const savedComment = await newComment.save();
        const commentId = savedComment._id;
        await Item.findByIdAndUpdate(itemId, { $push: { comments: commentId } });
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
}

// export const updateComment = async (req, res) => {
//     try {
//         const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         }, {new: true})
//         res.status(200).json(updatedComment)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const deleteComment = async (req, res) => {
//     try {
//         await Comment.findByIdAndDelete(req.params.id)
//         res.status(200).json("comment has been deleted")
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const getComments = async (req, res) => {
//     try {
//         const comments = await Comment.find()
//         res.status(200).json(comments)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// }