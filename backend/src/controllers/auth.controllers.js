import { MAIL_DOMAIN_LIST } from "../constants.js";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    
    if (!name || !username || !email || !password) return ErrorResponse(res, 400, `Fill all the details`);

    if (!email.includes("@")) return ErrorResponse(res, 400, `Invalid email address`);
    
    const domain = email.split("@")[1];
    if (!MAIL_DOMAIN_LIST.includes(domain)) return ErrorResponse(res, 400, `Invalid mail domain`);

    let user = await USER.findOne({ email });
    if (user) return ErrorResponse(res, 400, `Email already exists`);


    user = await USER.findOne({ username });
    if (user) return ErrorResponse(res, 400, `Username is already taken`);

    await USER.create({ name, username, email, password, verified: true});
    

    return SuccessResponse(res, `Account created`);
});

export const confirmSignup = asyncHandler(async (req, res) => {
    const { name, username, email, password, DOB } = req.body;

    if (!name || !username || !email || !password || !DOB) return ErrorResponse(res, 400, `Fill all the details`);

    const user = await USER.findOne({ username });
    if (user) return ErrorResponse(res, 400, `Username is already taken`);

    await USER.create({ name, username, email, password, verified: true, DOB});

    return SuccessResponse(res, "Signed up successfully");
});

export const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) return ErrorResponse(res, 400, `Fill all the details`);

    const user = await USER.findOne({ $or: [{ username: identifier }, { email: identifier }]});
    if (!user) return ErrorResponse(res, 404, `User does not exists`);

    const passwordCorrect = await user.validatePassword(password);
    if (!passwordCorrect) return ErrorResponse(res, 401, `Password is incorrect`);

    const accessToken = user.generateAccessToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        message: `Logged In`,
        accessToken
    });

});

export const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .json({
        success: true,
        message: "Logged out"
    });
});