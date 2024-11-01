import { v2 as cloudinary } from "cloudinary";
import { envVariables } from "@/app/__constants/env-variables";

cloudinary.config({
  cloud_name: envVariables.cloudinaryName,
  api_key: envVariables.cloudinaryKey,
  api_secret: envVariables.cloudinarySecret,
});

export default cloudinary;
