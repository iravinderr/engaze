import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { errorRes, successRes } from "../utils/response.utils.js";
import { validateCredentials } from "../utils/zod.utils.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import crypto from "crypto";

const nonces = new Map();

export const requestNonce = asyncHandler(async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) return errorRes(res, 400, "Wallet address is required");

    const nonce = `Sign this message to login: ${crypto.randomBytes(16).toString("hex")}`;
    nonces.set(walletAddress, nonce);

    // Auto-clear nonce after 2 min
    setTimeout(() => nonces.delete(walletAddress), 120000);

    successRes(res, null, nonce);
});

export const verifyWalletSignature = asyncHandler(async (req, res) => {
    const { walletAddress, signedMessage } = req.body;

    if (!walletAddress || !signedMessage) return errorRes(res, 400, "Wallet address and signed message required");

    const nonce = nonces.get(walletAddress);
    if (!nonce) return errorRes(res, 401, "Nonce expired or invalid");

    const valid = nacl.sign.detached.verify(
        new TextEncoder().encode(nonce),
        bs58.decode(signedMessage),
        bs58.decode(walletAddress)
    );

    if (!valid) return errorRes(res, 401, "Signature verification failed");

    let user = await USER.findOne({ walletAddress });
    if (!user) errorRes(res, 400, "User does not exist");

    const accessToken = user.generateAccessToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    };

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        message: `Logged In`,
        accessToken
    });
});

export const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) return errorRes(res, 400, `Fill all the details`);

    const { zodValidated, zodError } = validateCredentials({ name, username, email, password });
    
    if (!zodValidated) return errorRes(res, 400, `${zodError.errors[0].message}`);

    let user = await USER.findOne({ email });
    if (user) return errorRes(res, 400, `User already exists`);


    user = await USER.findOne({ username });
    if (user) return errorRes(res, 400, `Username is already taken`);

    await USER.create({ name, username, email, password, verified: true});
    
    return successRes(res, `Account created`);
});

export const confirmSignup = asyncHandler(async (req, res) => {
    const { name, username, email, password, DOB } = req.body;

    if (!name || !username || !email || !password || !DOB) return errorRes(res, 400, `Fill all the details`);

    const user = await USER.findOne({ username });
    if (user) return errorRes(res, 400, `Username is already taken`);

    await USER.create({ name, username, email, password, verified: true, DOB});

    return successRes(res, "Signed up successfully");
});

export const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) return errorRes(res, 400, `Fill all the details`);

    const user = await USER.findOne({ $or: [{ username: identifier }, { email: identifier }]});
    if (!user) return errorRes(res, 404, `User does not exists`);

    const passwordCorrect = await user.validatePassword(password);
    if (!passwordCorrect) return errorRes(res, 401, `Password is incorrect`);

    const accessToken = user.generateAccessToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        message: `Logged In`,
        accessToken
    });

});

export const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .json({
        success: true,
        message: "Logged out"
    });
});