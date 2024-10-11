import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { 
    createPost,
    deletePost,
    getOwnPosts,
    getPostsForHome, 
} from "../controllers/post.controllers.js";


const router = Router();


// CREATE POST
router.post("/create", verifyToken, upload.array("media", 10), createPost);

// DELETE POST
router.delete("/delete", verifyToken, deletePost);

// GET OWN POSTS
router.get("/get-own-posts", verifyToken, getOwnPosts);

// GET POSTS FOR HOME PAGE
router.get("/get-posts-for-home", verifyToken, getPostsForHome);





export default router;