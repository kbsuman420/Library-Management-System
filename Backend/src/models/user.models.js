import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        unique: true,
        required: true,
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
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationOtp: {
        type: String
    },
    verificationTokenExpires: {
        type: Date
    }


}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isCorrectOtp = async function (otp) {
    console.log(otp)
    console.log(this.verificationOtp)
    return await bcrypt.compare(otp, this.verificationOtp)
}

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