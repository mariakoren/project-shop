import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

export default mongoose.model("Item", CommentSchema)