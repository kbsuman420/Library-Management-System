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
    category: {
        type: String,
        require: true,
        enum: ["Science", "Engineering", "Arts", "Commerce", "Others"],
        default: "Others"
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
    },
    status: {
        type: String,
        default: 'Available'
    },
    coverImage: {
        type: String
    }
}, { timestamps: true })


export const Book = mongoose.model("Book", bookSchema)