import fs from "fs";
import { Blob } from "buffer";
import pinata from "../configs/pinata.configs.js";

export const uploadToIPFS = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const blob = new Blob([fs.readFileSync(localFilePath)]);
    const file = new File([blob], localFilePath.split("/").pop(), {
      type: "application/octet-stream",
    });

    const uploadResponse = await pinata.upload.public.file(file);

    fs.unlinkSync(localFilePath);

    return `${process.env.PINATA_GATEWAY}/ipfs/${uploadResponse.cid}`;
  } catch (error) {
    console.error("!!! ERROR IN PINATA FILE UPLOAD !!!", error);
    return null;
  }
};

export const deleteFromIPFS = async (cid) => {
  try {
    await pinata.unpin(cid);
    console.log(`File with CID ${cid} deleted from IPFS`);
  } catch (error) {
    console.error("!!! ERROR IN PINATA FILE DELETE !!!", error);
  }
};

export const fetchFromIPFS = async (cid) => {
  try {
    const file = await pinata.gateways.get(cid);
    return file.data;
  } catch (error) {
    console.error("!!! ERROR FETCHING FROM PINATA IPFS !!!", error);
    return null;
  }
};
