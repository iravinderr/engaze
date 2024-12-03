import { recommendPosts } from "../ai/recommendation.ai.js";
import { FOLLOW } from "../models/follow.models.js";
import { LIKE } from "../models/like.models.js";
import { POST } from "../models/post.models.js";
import { USER } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";


export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const file = req.file;
    let { captions, tags } = req.body;

    if (tags.length == 0) return ErrorResponse(res, 400, `Tags are missing`);
    if (!captions) return ErrorResponse(res, 400, `Captions are missing`);

    tags = tags.split(',').map(item => item.trim());

    // const filesUrl = [];
    // if (files.length !== 0) {
    //     files.forEach(async (file) => {

            let uploadResponse = null;
            if (file) uploadResponse = await uploadToCloudinary(file.path);
            // filesUrl.push(uploadResponse.secure_url);
    //     });
    // }

    const post = await POST.create({ author: userId, captions, media: uploadResponse?.secure_url, tags});

    return SuccessResponse(res, `Post created`, post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await POST.findById(postId);
    
    if (!post) return ErrorResponse(res, 404, `Post does not exists`);

    await POST.findByIdAndDelete(postId);
});

export const likePost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { postId } = req.body;

    const like = await LIKE.findOne({ userId, postId });
    if (like) return ErrorResponse(res, 400, `Post is already liked`);

    await LIKE.create({ userId, postId });

    return SuccessResponse(res, `Liked`);
});

export const unlikePost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { postId } = req.body;

    await LIKE.findOneAndDelete({ userId, postId });

    return SuccessResponse(res, `Unliked`);
});

export const commentOnPost = asyncHandler(async (req, res) => {
    
});

export const deleteCommentOnPost = asyncHandler(async (req, res) => {

});

export const getOwnPosts = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const posts = await POST.find({ author: userId }).sort({ createdAt: -1 });
    if (!posts) return ErrorResponse(res, 404, `You haven't posted anything yet`);

    return SuccessResponse(res, `Posts fetched`, posts);
});

export const getPostsForHome = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { scrollCount, postLimit } = req.query;

    const followees = await FOLLOW.find({ follower: userId }).select("followee");

    if (!followees.length) return ErrorResponse(res, 404, `You are not following anyone yet.`);

    const followeeIds = followees.map(f => f.followee);

    const posts = await POST.find({ author: { $in: followeeIds }})
        .sort({ createdAt: -1 })
        .skip((scrollCount-1) * postLimit)
        .limit(parseInt(postLimit))
        .populate("author", "profileImage name username")
        .exec();

    if (!posts) return ErrorResponse(res, 404, `No more posts to show`);

    return SuccessResponse(res, `Posts fetched`, posts);
});

// Function to get recommended posts for the feed
export const getPostsForFeed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    // Fetch recommended posts based on user interactions (likes, follows, etc.)
    const recommendedPostIds = await recommendPosts(userId);

    // Fetch the posts the user is recommended to see
    const posts = await POST.find({ _id: { $in: recommendedPostIds } }).populate('author');

    return SuccessResponse(res, `Recommended posts for the user`, posts);
});

export const fetchUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.query;

    const user = await USER.findOne({ username });
    if (!user) return ErrorResponse(res, 404, `User not found`);

    const userPosts = await POST.find({ author: user._id })
        .sort({ createdAt: -1 })
        .populate("author", "profileImage name username");
    
    if (!userPosts) return ErrorResponse(res, 404, `No posts found`);

    return SuccessResponse(res, ``, userPosts);
});