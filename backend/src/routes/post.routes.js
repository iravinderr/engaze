import { Router } from "express";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { 
    createPost 
} from "../controllers/post.controllers.js";


const router = Router();


// CREATE POST
router.post("/create", verifyToken, upload.array("media", 10), createPost);







export default router;