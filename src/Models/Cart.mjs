import mongoose from "mongoose";


const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true
    },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    qty: {
        type: Number,
        require: true
    }
});


const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
   Items: {
        type: [CartItemSchema],   
        default: []               
    }
});

export const Cart = mongoose.model('cart',CartSchema);