import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    bookId: {
        type: String,
        required: true
    },
    reservationDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Successfull"],
        default: "Pending"
    }
}, { timestamps: true})



export const Reservation = mongoose.model("Reservation", reservationSchema);