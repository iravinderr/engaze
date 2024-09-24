import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password, DOB } = req.body;

    if (!name || !username || !email || !password || !DOB) return ErrorResponse(res, 400, `Fill all the details`);

    let user = await USER.findOne({ email });
    if (user) return ErrorResponse(res, 400, `Email already exists`);

    user = await USER.findOne({ username });
    if (user) return ErrorResponse(res, 400, `Username is already taken`);

    await USER.create({ name, username, email, password, verified: true, DOB});

    return SuccessResponse(res, "Signed up successfully");
});

// export const confirmSignup = asyncHandler(async (req, res) => {
//     const { name, username, email, password, DOB } = req.body;

//     if (!name || !username || !email || !password || !DOB) return ErrorResponse(res, 400, `Fill all the details`);

//     const user = await USER.findOne({ username });
//     if (user) return ErrorResponse(res, 400, `Username is already taken`);

//     await USER.create({ name, username, email, password, verified: true, DOB});

//     return SuccessResponse(res, "Signed up successfully");
// });

export const signin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) return ErrorResponse(res, 400, `Fill all the details`);

    const user = await USER.findOne({ $or: [{ username: identifier }, { email: identifier }]});
    if (!user) return ErrorResponse(res, 404, `User does not exists`);

    
});