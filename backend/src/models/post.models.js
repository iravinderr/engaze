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
        },
        media: {
            type: String,
            // required: true
        },
        tags: [{
            type: String
        }]
    },

    { timestamps: true }
);

export const POST = mongoose.model("POST", postSchema);