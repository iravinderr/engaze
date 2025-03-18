import { PinataSDK } from "pinata";
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY
});

export default pinata;
