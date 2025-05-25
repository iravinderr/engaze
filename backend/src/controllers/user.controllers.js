import { FOLLOW } from "../models/follow.models.js";
import { USER } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { errorRes, successRes } from "../utils/response.utils.js";
import { LIKE } from "../models/like.models.js";
import { uploadToPinataIPFS } from "../utils/pinata.utils.js";

export const getProfileDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const user = await USER.findById(userId);
    if (!user) return errorRes(res, 404, `User not found`).select("-password -email -verified");

    return successRes(res, ``, user);
});

export const changeProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const file = req.file;

    if (!file) return errorRes(res, 400, `No media file attached`);
    
    let uploadUrl = null;
    // if (file) uploadResponse = await uploadToCloudinary(file.path);
    // uploadUrl = uploadResponse?.secure_url;
    
    uploadUrl = await uploadToPinataIPFS(file.path);

    if (!uploadUrl) return errorRes(res, 500, `Internal Server Error. Profile couldn't be updated.`);
    
    const profile = await USER.findByIdAndUpdate(userId, { profilePicture: uploadUrl }, { new: true }).select("-password -email -verified");

    return successRes(res, `Profile updated`, profile);
});

export const changeUsername = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.body;

    const user = await USER.findOne({ username });
    if (user) return errorRes(res, 400, `Username is already taken`);

    await USER.findByIdAndUpdate(userId, { username });

    return successRes(res, `Username changed`);
});

export const searchUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.query;

    if (!username) return errorRes(res, 400, `Enter the username`);
    const users = await USER.find({ username: { $regex: `^${username}`, $options: "i" }}).select("_id profilePicture username name");

    if (!users.length) return errorRes(res, 404, `No user exists`);

    return successRes(res, `Users Fetched`, users);
});

export const fetchUserDetails = asyncHandler(async (req, res) => {
    const { username } = req.query;

    const user = await USER.findOne({username}).select("-password -verified -email");
    if (!user) return errorRes(res, 404, `User not found`);

    return successRes(res, ``, user);
});

export const fetchRandomUserDetails = asyncHandler(async (req,res) => {
    
    const users = await USER.aggregate([
        {$sample : { size : 5}},
        {$project : {password:0,verified:0,email:0}}
    ]);


    if(!users || users.length === 0) return errorRes(res,404,"No Users Found")

    return successRes(res,'Users Found',users)

})

export const followUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const { followeeId } = req.body;
    if (!followeeId) return errorRes(res, 400, `Followee id is missing`);
    
    const follow = await FOLLOW.findOne({ followee: followeeId, follower: userId});
    if (follow) return errorRes(res, 400, `You already follow this account`);
    
    await FOLLOW.create({ followee: followeeId, follower: userId });
    
    return successRes(res, `Followed`);
});

export const unfollowUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    
    const { followeeId } = req.query;
    if (!followeeId) return errorRes(res, 400, `Followee id is missing`);

    const follow = await FOLLOW.findOne({ followee: followeeId, follower: userId });
    if (!follow) return errorRes(res, 400, `You do not follow this account`);

    await FOLLOW.deleteOne({ followee: followeeId, follower: userId });

    return successRes(res, `Unfollowed`);
});

export const checkIfFollowed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { username } = req.query;

    const user = await USER.findOne({ username });
    if (!user) return errorRes(res, 404, `User not found`);

    const followExists = await FOLLOW.findOne({ followee: user._id, follower: userId});
    if (!followExists) return errorRes(res, 404, ``);

    return successRes(res, ``, null);
})

export const checkIfLiked = asyncHandler(async (req,res) => {
    const userId = req.user?._id;
    const { postId } = req.query;

    const likeExists = await LIKE.findOne({userId,postId});
    const likes = await LIKE.find({postId})
    if (!likeExists) return errorRes(res,404,'Did not Like',likes);

    return successRes(res,'',likes);
})