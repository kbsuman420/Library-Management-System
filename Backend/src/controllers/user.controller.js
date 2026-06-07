import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"

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
    if (existedUser) {
        throw new ApiError(401, "Email address already used")
    }
    const lastStudent = await User.findOne({
        student_Id: { $exists: true }
    }).sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastStudent) {
        nextNumber =
            parseInt(lastStudent.student_id.replace("STU", "")) + 1;
    }

    const student_id = `STU${String(nextNumber).padStart(3, "0")}`;

    const user = await User.create(
        {
            fullName,
            student_id,
            email,
            password,
            role,
            phone
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
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
    if (!user) throw new ApiError("User not found!!")
    const isCorrectPassword = await user.isCorrectPassword(password)
    if (!isCorrectPassword) {
        throw new ApiError("Password is incorrect")
    }

    const loginUser = await User.findById(user._id).select(
        "-password"
    )

    res.status(200).json(new ApiResponse(201, loginUser, "Login Successfully"))
}

const loginUser = asyncHandler(loginUserFn)



export { registerUser, loginUser }