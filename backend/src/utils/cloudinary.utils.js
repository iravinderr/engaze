import { v2 as cloudinary } from "cloudinary";
import { APP_NAME } from "../constants.js";
import fs from "fs";

export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: `${APP_NAME}`,
            use_filename: true
        });

        fs.unlinkSync(localFilePath);
        return uploadResponse;
    } catch (error) {
        console.log("!!! ERROR IN CLOUDINARY FILE UPLOAD !!!");
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("!!! ERROR IN CLOUDINARY FILE DELETE !!!");
        console.log(error);
    }
}