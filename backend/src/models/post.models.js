import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        captions: {
            type: String,
            required: true,
        },
        media: [{
            type: String,
            required: true
        }],
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        tags: [{
            type: String
        }]
    },

    { timestamps: true }
);

export const POST = mongoose.model("POST", postSchema);