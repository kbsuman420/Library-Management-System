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
    const {fullname, email, password, role, phone} = req.body;

    if(
        [fullname, email, password, role, phone ].some((field) => field.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({ email: email});
    if(!existedUser) {
        throw new ApiError(400, "Email address already used")
    }
    const user = await User.create(
        {
            fullname,
            email,
            password,
            role,
            phone
        }
    )

    const createdUser = User.findById(user._id).select(
        "-password"
    )
    console.log(createdUser);
    res.status(200).json(new ApiResponse(201, createdUser, "User Register Successfully"))


}
const registerUser = asyncHandler(registerUserFn);



export { registerUser }