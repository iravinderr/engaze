import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
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
        }
    },

    { timestamps: true }
);

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.validatePassword = async function(password)  {
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