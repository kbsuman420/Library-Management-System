import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    reservationDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "reject"],
        default: "pending"
    }
}, { timestamps: true})


export const Reservation = mongoose.model("Reservation", reservationSchema)
