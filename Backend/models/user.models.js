import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Student", "Librarian"],
        default: "Student"
    },
    phone: {
        type: String,
        required: true,
    },
    borrowed_book: [],

}, {timestamps: true})

export const User = mongoose.model("User", userSchema);