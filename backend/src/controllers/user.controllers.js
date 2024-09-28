import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";


export const changeProfileDetails = asyncHandler(async (req, res) => {
    
});

export const changeUsername = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.body;

    const user = await USER.findOne({ username });
    if (user) return ErrorResponse(res, 400, `Username is already taken`);

    await USER.findByIdAndUpdate(userId, { username });

    return SuccessResponse(res, `Username changed`);
});

