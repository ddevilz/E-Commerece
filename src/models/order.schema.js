import mongoose from "mongoose";
import status from "../utils/status";


const orderSchema = new mongoose.Schema({
    product: {
        type: [  // there could be multiple products so thats the reason we are giving a array here
            {
               productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
               },
               count: Number,
               price: Number
            }
        ]
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    coupon: String,
    transactionId: String,
    status: {
        type: String,
        enum: Object.values(status),
        default: "ORDERED"
    }
},{timestamps:true})

export default mongoose.model("Order", orderSchema)