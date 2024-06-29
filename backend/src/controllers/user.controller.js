import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const generateAccesTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = await user.generateAccesToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("generateAccesTokenAndRefreshToken Error:", error);
        throw new ApiError(500, "Failed to generate tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, phone, role, dob, gender, address } = req.body;

    // Check if any required fields are empty
    if ([fullName, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(401, "All fields are required");
    }

    // Check if user already exists with the same fullName or email
    const existingUser = await User.findOne({ $or: [{ fullName }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "Email or Full Name already in use");
    }

    let avatarUrl = "";
    // Check for avatar upload
    if (req.file && req.file.path) {
        const avatarResponse = await uploadOnCloudinary(req.file.path);
        avatarUrl = avatarResponse.url || "";
    }

    // Create the user in the database
    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        role,
        dob,
        gender,
        address,
        avatar: avatarUrl,
    });

    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }

    // Return a response with created user details (excluding sensitive information)
    const responseUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json(new ApiResponse(200, responseUser, "User registered successfully"));
});



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate email presence
    if (!email) {
        throw new ApiError(401, "Email is required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect");
    }

    // Generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccesTokenAndRefreshToken(user._id);

    // Remove sensitive data from user object
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Define cookie options based on environment
    const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        secure: process.env.NODE_ENV !== "development", // Enable secure cookies in production
        // expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000), // Example for setting expiration
    };

    // Set cookies and send JSON response
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User successfully logged in"));
});

const logoutUser = asyncHandler(async (req, res) => {
    // Remove refreshToken from user document
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    // Define cookie options based on environment
    const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        secure: process.env.NODE_ENV !== "development", // Enable secure cookies in production
        // expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000), // Example for setting expiration
    };

    // Clear cookies and send JSON response
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser }