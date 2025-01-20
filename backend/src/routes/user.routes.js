import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
    changeUsername,
    checkIfFollowed,
    checkIfLiked,
    fetchUserDetails,
    followUser,
    getProfileDetails,
    searchUser, 
    unfollowUser, 
    updateProfileDetails
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";



const router = Router();


// GET PROFILE DETAILS 
router.get("/get-profile-details", verifyToken, getProfileDetails);

// UPDATE PROFILE DETAILS
router.put("/update-profile-details", verifyToken, upload.single("file"), updateProfileDetails);

// CHANGE USERNAME
router.put("/change-username", verifyToken, changeUsername);

// SEARCH USER
router.get("/search", verifyToken, searchUser);

// FETCH USER DETAILS
router.get("/fetch-user-details", verifyToken, fetchUserDetails);

// FOLLOW USER
router.post("/follow", verifyToken, upload.none(), followUser);

// UNFOLLOW USER
router.delete("/unfollow", verifyToken, unfollowUser);

// CHECK IF USER IS FOLLOWED
router.get("/check-if-followed", verifyToken, checkIfFollowed);

router.get("/check-if-liked",verifyToken,checkIfLiked)

export default router;