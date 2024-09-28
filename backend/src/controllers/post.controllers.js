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

    const post = await POST.create({ captions, media: filesUrl, userId, tags});

    return SuccessResponse(res, `Post created`, post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { postId } = req.params;

    
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