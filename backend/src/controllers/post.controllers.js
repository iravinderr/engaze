import { FOLLOW } from "../models/follow.models.js";
import { POST } from "../models/post.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";


export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const files = req.files;
    const { captions, tags } = req.body;

    if (files.length == 0) return ErrorResponse(res, 400, `No media files selected`);
    if (tags.length == 0) return ErrorResponse(res, 400, `Tags are missing`);
    if (!captions) return ErrorResponse(res, 400, `Captions are missing`);

    const filesUrl = [];
    if (files.length != 0) {
        files.forEach(async (file) => {
            const uploadResponse = await uploadToCloudinary(file.path);
            filesUrl.push(uploadResponse.secure_url);
        });
    }

    const post = await POST.create({ author: userId, captions, media: filesUrl, tags});

    return SuccessResponse(res, `Post created`, post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await POST.findById(postId);
    
    if (!post) return ErrorResponse(res, 404, `Post does not exists`);

    await POST.findByIdAndDelete(postId);
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

    const posts = (await POST.find({ userId: { $in: followeeIds }}))
        .sort({ createdAt: -1 })
        .skip((scrollCount-1) * postLimit)
        .limit(parseInt(postLimit))
        .populate("author", "profileImage name username")
        .exec();

    if (!posts) return ErrorResponse(res, 404, `No more posts to show`);

    return SuccessResponse(res, `Posts fetched`, posts);
});

export const getPostForFeed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const likedPosts = await POST.find({ userId });
    if (!likedPosts) {
        // recommend random posts based on the location, language, interests
    }

    else {
        // use the tags of these posts to recommend posts
    }
});