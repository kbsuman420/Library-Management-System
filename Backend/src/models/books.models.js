import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    totalCopies: {
        type: Number,
        required: true,
        default: 0
    },
    availableCopies: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    }
}, { timestamps: true })


export const Book = mongoose.model("Book", bookSchema)