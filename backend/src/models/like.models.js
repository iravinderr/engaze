import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "POST",
            required: true,
        }
    },
    
    { timestamps: true }
)

export const LIKE = mongoose.model("LIKE", likeSchema);