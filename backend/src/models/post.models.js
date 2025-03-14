import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
        captions: {
            type: String,
            required: true,
            trim: true
        },
        media: {
            type: String,
            // required: true
        },
        tags: [{
            type: String,
            lowercase: true,
            trime: true
        }]
    },

    { timestamps: true }
);

export const POST = mongoose.model("POST", postSchema);