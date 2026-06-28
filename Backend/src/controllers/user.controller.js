import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from "bcrypt";
import { VerificationMail } from "../utils/sendMail.js"
import crypto from "crypto";

const registerUserFn = async (req, res) => {
    // get user details from frontend
    // validation
    // check user already exist with email
    // create a object and enter in db
    // check the user creation
    // remove password and send res
    const { fullName, email, password, role, phone } = req.body;

    if (
        [fullName, email, password, role, phone].some((field) => field.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({ email: email });
    if (existedUser && existedUser.isVerified) {
        throw new ApiError(401, "Email address already used")
    } else if (existedUser && !existedUser.isVerified) {
        await User.deleteOne({ email: email });
    }
    const lastStudent = await User.findOne({
        student_Id: { $exists: true }
    }).sort({ createdAt: -1 });

    let nextNumber = 5;

    if (lastStudent) {
        nextNumber =
            parseInt(lastStudent.student_id.replace("STU", "")) + 1;
    }

    const student_id = `STU${String(nextNumber).padStart(3, "0")}`;
    const verificationOtp = crypto.randomInt(100000, 1000000);

    const hashVerificationOtp = await bcrypt.hash(String(verificationOtp), 10);
    console.log(hashVerificationOtp)


    const user = await User.create(
        {
            fullName,
            student_id,
            email,
            password,
            verificationOtp: hashVerificationOtp,
            verificationTokenExpires: Date.now() + 1000 * 60 * 60,
            role,
            phone
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    const response = await VerificationMail(email, verificationOtp);
    if (!response) {
        await User.deleteOne({ email })
        throw new ApiError(500, "Internal server error")
    }

    // const accessToken = createdUser.generateAccessToken();
    // const refreshToken = createdUser.generateRefreshToken();
    res.status(200).json(new ApiResponse(201, createdUser, "User Register Successfully"))


}
const registerUser = asyncHandler(registerUserFn);

const loginUserFn = async (req, res) => {

    // get email, password from the user
    // find user using email if not throw error to the user
    // check the password correct or not if password wrong throw error
    // password is correct then return res user
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All field is required")
    }

    const user = await User.findOne({ email: email })
    if (!user || user?.isVerified === false) throw new ApiError(404, "User not found!!")
    const isCorrectPassword = await user.isCorrectPassword(password)

    if (!isCorrectPassword) {
        console.log("Password is incorrect")
        throw new ApiError(401, "Password is incorrect")
    }

    const loginUser = await User.findById(user._id).select(
        "-password"
    )

    console.log(loginUser)

    res.status(200).json(new ApiResponse(201, loginUser, "Login Successfully"))
}

const loginUser = asyncHandler(loginUserFn)


const verifyEmailFn = async (req, res) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        throw new ApiError(400, "Verification token is required")
    }


    const user = await User.findOne({
        email,
        verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token")
    }

    const isOtpCorrect = await user.isCorrectOtp(String(otp));
    console.log("OTP match result:", isOtpCorrect)

    if (!isOtpCorrect) {
        throw new ApiError(400, "Invalid or expired verification token")
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, user, "Email verified successfully"))
}

const verifyEmail = asyncHandler(verifyEmailFn)

export { registerUser, loginUser, verifyEmail }