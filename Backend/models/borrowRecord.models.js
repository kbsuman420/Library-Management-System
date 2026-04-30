import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
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
        type: true
    },
    status: {
        type: String,
        enum: ["Borrowed", "Returned"]
    },
    fine: {
        type: Number,
        default: 0
    }
})


export const BorrowRecord = mongoose.model("BorrowBook", borrowRecordSchema);