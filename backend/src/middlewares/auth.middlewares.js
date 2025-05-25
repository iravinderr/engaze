import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/handler.utils.js";
import { errorRes } from "../utils/response.utils.js";
import { USER } from "../models/user.models.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken;
    if (!token) return errorRes(res, 401, `Unauthorized request`);

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await USER.findById(decodedToken._id).select("-password");
        req.user = user;
    } catch (error) {
        return errorRes(res, 401, `Session expired. Login again.`);
    }

    next();
});