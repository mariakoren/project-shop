import mongoose, { trusted } from 'mongoose';
const InvoiceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    itemDetails:
        {
            itemId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
})

export default mongoose.model("Invoice", InvoiceSchema)