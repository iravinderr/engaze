import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
    {
        followee: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
        follower: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        }
    },

    { timestamps: true }
);

export const FOLLOW = mongoose.model("FOLLOW", followSchema);