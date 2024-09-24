import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
    confirmSignup,
    login,
    logout,
    signup
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/user.middlewares.js";

// INITIALISING ROUTER
const router = Router();

// SIGN UP 
router.post("/signup", upload.none(), signup);

// CONFIRM SIGNUP
// router.post("/confirm-signup", upload.none(), confirmSignup);

// LOGIN
router.post("/login", upload.none(), login);

// LOGOUT
router.post("/logout", verifyToken(), upload.none(), logout);





export default router;


