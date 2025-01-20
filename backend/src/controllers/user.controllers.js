import { log } from "@tensorflow/tfjs";
import { FOLLOW } from "../models/follow.models.js";
import { POST } from "../models/post.models.js";
import { USER } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";
import { LIKE } from "../models/like.models.js";

export const getProfileDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const user = await USER.findById(userId);
    if (!user) return ErrorResponse(res, 404, `User not found`).select("-password");

    return SuccessResponse(res, ``, user);
});

export const updateProfileDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const file = req.file;
    let uploadResponse;
    if (file) uploadResponse = await uploadToCloudinary(file.path);
    
    const user = await USER.findByIdAndUpdate(userId, { profileImage: uploadResponse.secure_url }, {new: true});

    return SuccessResponse(res, `Profile updated`, user);
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
    const userId = req.user?._id;
    const { username } = req.query;

    if (!username) return ErrorResponse(res, 400, `Enter the username`);
    const users = await USER.find({ username: { $regex: `^${username}`, $options: "i" }}).select("_id profileImage username name");

    if (!users.length) return ErrorResponse(res, 404, `No user exists`);

    return SuccessResponse(res, `Users Fetched`, users);
});

export const fetchUserDetails = asyncHandler(async (req, res) => {
    const { username } = req.query;

    const user = await USER.findOne({username}).select("-password -verified -email");
    if (!user) return ErrorResponse(res, 404, `User not found`);

    return SuccessResponse(res, ``, user);
});

export const followUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const { followeeId } = req.body;
    if (!followeeId) return ErrorResponse(res, 400, `Followee id is missing`);
    
    const follow = await FOLLOW.findOne({ followee: followeeId, follower: userId});
    if (follow) return ErrorResponse(res, 400, `You already follow this account`);
    
    await FOLLOW.create({ followee: followeeId, follower: userId });
    
    return SuccessResponse(res, `Followed`);
});

export const unfollowUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    
    const { followeeId } = req.query;
    if (!followeeId) return ErrorResponse(res, 400, `Followee id is missing`);

    const follow = await FOLLOW.findOne({ followee: followeeId, follower: userId });
    if (!follow) return ErrorResponse(res, 400, `You do not follow this account`);

    await FOLLOW.deleteOne({ followee: followeeId, follower: userId });

    return SuccessResponse(res, `Unfollowed`);
});

export const checkIfFollowed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.query;

    const user = await USER.findOne({ username });
    if (!user) return ErrorResponse(res, 404, `User not found`);

    const followExists = await FOLLOW.findOne({ followee: user._id, follower: userId});
    if (!followExists) return ErrorResponse(res, 404, ``);

    return SuccessResponse(res, ``, null);
})

export const checkIfLiked = asyncHandler(async (req,res) => {
    const userId = req.user?._id;
    const { postId } = req.query;

    const likeExists = await LIKE.findOne({userId,postId});
    const likes = await LIKE.find({postId})
    if (!likeExists) return ErrorResponse(res,404,'Did not Like',likes);

    return SuccessResponse(res,'',likes);
})