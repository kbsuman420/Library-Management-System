import mongoose from "mongoose"

const borrowRecordSchema = new mongoose.Schema({
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
        default: Date.now
    },
    dueDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    },
    fine: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

borrowRecordSchema.index({ userId: 1 });
borrowRecordSchema.index({ bookId: 1 });


export const BorrowBook = mongoose.model("BorrowBook", borrowRecordSchema);