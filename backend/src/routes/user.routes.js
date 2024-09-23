import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { confirmSignup, signup } from "../controllers/user.controllers.js";

// INITIALISING ROUTER
const router = Router();

// SIGN UP 
router.post("/signup", upload.none(), signup);

// CONFIRM SIGNUP
router.post("/confirm-signup", upload.none(), confirmSignup);