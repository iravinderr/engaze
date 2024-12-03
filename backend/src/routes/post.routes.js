import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { 
    commentOnPost,
    createPost,
    deleteCommentOnPost,
    deletePost,
    getOwnPosts,
    getPostsForFeed,
    getPostsForHome,
    likePost,
    unlikePost, 
} from "../controllers/post.controllers.js";


const router = Router();


// CREATE POST
router.post("/create", verifyToken, upload.array("media", 10), createPost);

// DELETE POST
router.delete("/delete", verifyToken, deletePost);

// LIKE POST
router.post("/like", verifyToken, upload.none(), likePost);

// UNLIKE POST
router.delete("/unlike", verifyToken, unlikePost);

// COMMENT POST
router.post("/comment", verifyToken, upload.none(), commentOnPost);

// DELETE POST
router.delete("/delete-comment", verifyToken, deleteCommentOnPost);

// GET OWN POSTS
router.get("/get-own-posts", verifyToken, getOwnPosts);

// GET POSTS FOR HOME PAGE
router.get("/get-posts-for-home", verifyToken, getPostsForHome);

// GET POSTS FOR FEED
router.get("/get-posts-for-feed", verifyToken, getPostsForFeed);





export default router;