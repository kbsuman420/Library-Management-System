import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    totalCopies: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    coverImage: {
        type: String
    }
}, {timestamps: true})


export const Book = mongoose.model("Book", bookSchema);