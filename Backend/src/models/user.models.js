import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books"
        }
    ]

}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generate_access_token = function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            name: this.name,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.refresh_access_token = function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            name: this.name,
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRECT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)