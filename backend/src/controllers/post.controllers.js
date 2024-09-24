import { asyncHandler } from "../utils/handler.utils.js";


export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const files = req.files;
    const { captions, tags } = req.body;

});