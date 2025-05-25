import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
    login,
    logout,
    requestNonce,
    signup,
    verifyWalletSignature
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

// INITIALISING ROUTER
const router = Router();

// SIGN UP 
router.post("/signup", upload.none(), signup);

// CONFIRM SIGNUP
// router.post("/confirm-signup", upload.none(), confirmSignup);

// LOGIN
router.post("/login", upload.none(), login);

// LOGOUT
router.post("/logout", verifyToken, upload.none(), logout);

// VERIFY TOKEN
router.post("/verify-token", verifyToken, upload.none(), (req, res) => res.status(200).json({success: true}));

// REQUEST NONCE
router.post("/request-nonce", upload.none(), requestNonce);

// VERIFY SIGNATURE
router.post("/verify-wallet-signature", upload.none(), verifyWalletSignature);



export default router;


