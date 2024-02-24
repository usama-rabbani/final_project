import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    slug: {
        type: String,
        required: true,

    },

    description: {
        type: String,
        required: true,

    },
    price: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        ref: 'category',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
    },

    image: {
        data: Buffer,
        contentType: String,
    },

    shipping: {
        type: String,

    },
}, { timestamps: true })

export default mongoose.model('product', productSchema)