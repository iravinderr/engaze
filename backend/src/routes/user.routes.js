import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
    changeProfilePicture,
    changeUsername,
    checkIfFollowed,
    checkIfLiked,
    fetchRandomUserDetails,
    fetchUserDetails,
    followUser,
    getProfileDetails,
    searchUser, 
    unfollowUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";



const router = Router();


// GET PROFILE DETAILS 
router.get("/get-profile-details", verifyToken, getProfileDetails);

// UPDATE PROFILE DETAILS
router.put("/change-profile-picture", verifyToken, upload.single("file"), changeProfilePicture);

// CHANGE USERNAME
router.put("/change-username", verifyToken, changeUsername);

// SEARCH USER
router.get("/search", verifyToken, searchUser);

// FETCH USER DETAILS
router.get("/fetch-user-details", verifyToken, fetchUserDetails);

// FETCH RANDOM USER DETAILS
router.get("/fetch-random-user-details", verifyToken, fetchRandomUserDetails);

// FOLLOW USER
router.post("/follow", verifyToken, upload.none(), followUser);

// UNFOLLOW USER
router.delete("/unfollow", verifyToken, unfollowUser);

// CHECK IF USER IS FOLLOWED
router.get("/check-if-followed", verifyToken, checkIfFollowed);

// CHECK IF USER IS LIKED
router.get("/check-if-liked",verifyToken,checkIfLiked)

export default router;