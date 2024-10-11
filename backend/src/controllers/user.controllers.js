import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";

export const getProfileDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const user = await USER.findById(userId);
    if (!user) return ErrorResponse(res, 404, `User not found`).select("-password");

    return SuccessResponse(res, ``, user);
});

export const updateProfileDetails = asyncHandler(async (req, res) => {
    
});

export const changeUsername = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.body;

    const user = await USER.findOne({ username });
    if (user) return ErrorResponse(res, 400, `Username is already taken`);

    await USER.findByIdAndUpdate(userId, { username });

    return SuccessResponse(res, `Username changed`);
});

export const searchUser = asyncHandler(async (req, res) => {
    const { username } = req.body;

    if (!username) return ErrorResponse(res, 400, `Enter the username`);
    const users = await USER.find({ username: { $regex: `^${username}`, $options: "i" }}).select("profileImage username name");

    if (!users.length) return ErrorResponse(res, 404, `No user exists`);

    return SuccessResponse(res, ``, users);
});