import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
    changeUsername,
    getProfileDetails,
    searchUser, 
    updateProfileDetails
} from "../controllers/user.controllers.js";



const router = Router();


// GET PROFILE DETAILS
router.get("/get-profile-details", verifyToken, getProfileDetails);

// UPDATE PROFILE DETAILS
router.put("/update-profile-details", verifyToken, updateProfileDetails);

// CHANGE USERNAME
router.put("/change-username", verifyToken, changeUsername);

// SEARCH USER
router.get("/serach", verifyToken, searchUser);



export default router;