import mongoose from "mongoose"

const borrowRecordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    borrowDate: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"]
    },
    fine: {
        type: Number,
        default: 0
    }
}, {timestamps: true})



export const BorrowBook = mongoose.model("BorrowBook", borrowRecordSchema);