import mongoose from 'mongoose';
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    desc: {
        type: String,
        required: true
    },
    avaible: {
        type: Number,
        required: true
    },
    comments: {
        type: [String],
    }
})

export default mongoose.model("Item", ItemSchema)