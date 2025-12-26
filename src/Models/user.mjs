import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name required"],
        minlength: [5, "Minimum 5 words required"]
    },
    email: {
        type: String,
        require: [true, "Email required"],
        maxlength: [50, "Email cannot exceed limit"]
    },
    password: {
        type: String,
        require: [true, "Password required"],
        minlength: [8, "Password must be atleast 8 characters"]
    },
    createdAt: { type: Date, default: Date.now }
})


export const User = mongoose.model("user", userSchema)