import mongoose from "mongoose";

const RequiredSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    slug: {
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
}, { timestamps: true }
)

export default mongoose.model('userrequirements', RequiredSchema)
