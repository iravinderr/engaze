import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/dtmdsmqfe/image/upload/v1741961604/Engaze/1741961599986_defaul_pfp_jqpuqs.jpg"
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        DOB: {
            type: Date,
            // required: true
        },
        walletAddress: {
            type: String,
            lowercase: true,
            sparse: true // allow some users to not have a wallet
        },
    },

    { timestamps: true }
);

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: `1d`
        }
    )
}


export const USER = mongoose.model(`USER`, userSchema);