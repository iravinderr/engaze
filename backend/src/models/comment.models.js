import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
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
        },
        comment: {
            type: String,
            required: true,
            trim: true
        }
    },
    
    { timestamps: true }
);

export const COMMENT = mongoose.model("COMMENT", commentSchema);