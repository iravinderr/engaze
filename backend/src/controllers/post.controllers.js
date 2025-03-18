import { COMMENT } from "../models/comment.models.js";
import { FOLLOW } from "../models/follow.models.js";
import { LIKE } from "../models/like.models.js";
import { POST } from "../models/post.models.js";
import { USER } from "../models/user.models.js";
import { recommendPosts } from "../recommender/feed.recommender.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { uploadToIPFS } from "../utils/pinata.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";


export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const file = req.file;
    let { captions, tags } = req.body;

    if (!file) return ErrorResponse(res, 400, `No media file attached`);
    if (tags.length == 0) return ErrorResponse(res, 400, `Tags are missing`);
    if (!captions) return ErrorResponse(res, 400, `Captions are missing`);

    // const filesUrl = [];
    // if (files.length !== 0) {
    //     files.forEach(async (file) => {

            // let uploadResponse = null;
            let uploadUrl = null;
            // if (file) uploadResponse = await uploadToCloudinary(file.path);
            // uploadUrl = uploadResponse?.secure_url;
            
            if (file) uploadUrl = await uploadToIPFS(file.path);
            
            // filesUrl.push(uploadUrl);
    //     });
    // }

    if (!uploadUrl) return ErrorResponse(res, 500, `Internal Server Error. Post couldn't be created.`);

    const post = await POST.create({ author: userId, captions, media: uploadUrl, tags});

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
    const { postId } = req.query;

    await LIKE.findOneAndDelete({ userId, postId });

    return SuccessResponse(res, `Unliked`);
});

export const commentOnPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { postId, comment } = req.body;
    
    const post = await POST.findById(postId);
    if (!post) return ErrorResponse(res, 404, `Post does not exist`);
    
    if (!comment) return ErrorResponse(res, 400, `Enter some content`);

    const commentMade = await COMMENT.create({ userId, postId, comment });

    return SuccessResponse(res, `Commented`, commentMade);
});

export const deleteCommentOnPost = asyncHandler(async (req, res) => {

});

export const getOwnPosts = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const posts = await POST.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("author", "profilePicture name username")
        .exec();

    if (!posts) return ErrorResponse(res, 404, `You haven't posted anything yet`);

    return SuccessResponse(res, `Posts fetched`, posts);
});

export const getPostsForHome = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    // const { scrollCount, postLimit } = req.query;

    const followees = await FOLLOW.find({ follower: userId }).select("followee");

    if (!followees.length) return ErrorResponse(res, 404, `You are not following anyone yet.`);

    const followeeIds = followees.map(f => f.followee);

    const posts = await POST.find({ author: { $in: followeeIds }})
        .sort({ createdAt: -1 })
        .populate("author", "profilePicture name username")
        .exec();
        // .skip((scrollCount-1) * postLimit)
        // .limit(parseInt(postLimit))

    if (!posts) return ErrorResponse(res, 404, `No more posts to show`);

    return SuccessResponse(res, null, posts);
});

// Function to get recommended posts for the feed
export const getPostsForFeed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    // Fetch recommended post IDs
    const recommendedPostIds = await recommendPosts(userId);

    // Fetch the posts using recommended post IDs
    const posts = await POST.find({ _id: { $in: recommendedPostIds } }).populate('author', "-email -password -verified -createdAt -updatedAt -__v");

    return SuccessResponse(res, null, posts);
});

export const fetchUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.query;

    const user = await USER.findOne({ username });
    if (!user) return ErrorResponse(res, 404, `User not found`);

    const userPosts = await POST.find({ author: user._id })
        .sort({ createdAt: -1 })
        .populate("author", "profilePicture name username");
    
    if (!userPosts) return ErrorResponse(res, 404, `No posts found`);

    return SuccessResponse(res, null, userPosts);
});