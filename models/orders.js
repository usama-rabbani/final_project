import mongoose from "mongoose";
const ordersSchema = new mongoose.Schema({
    product: [
        {
            type: String,
            ref: 'product'
        }
    ],
    payment: {},
    buyer: {
        type: String,
        ref: "users",
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
},
    { timestamps: true }
);
export default mongoose.model('orders', ordersSchema)