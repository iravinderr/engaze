import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import { PinataSDK } from "pinata";
import { Blob } from "buffer";
import fs from "fs";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY
});

export const uploadToPinataIPFS = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const blob = new Blob([fs.readFileSync(localFilePath)]);
    const file = new File([blob], localFilePath.split("/").pop(), { type: "application/octet-stream" });

    const uploadResponse = await pinata.upload.public.file(file);

    fs.unlinkSync(localFilePath);

    return `${process.env.PINATA_GATEWAY}/ipfs/${uploadResponse.cid}`;
  } catch (error) {
    console.error("!!! ERROR IN PINATA FILE UPLOAD !!!", error);
    return null;
  }
};

export const deleteFromPinataIPFS = async (cid) => {
  try {
    await pinata.unpin(cid);
  } catch (error) {
    console.error("!!! ERROR IN PINATA FILE DELETE !!!", error);
  }
};

export const fetchFromPinataIPFS = async (cid) => {
  try {
    const file = await pinata.gateways.get(cid);
    return file.data;
  } catch (error) {
    console.error("!!! ERROR FETCHING FROM PINATA IPFS !!!", error);
    return null;
  }
};
