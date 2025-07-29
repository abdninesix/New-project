// utils/uploadImage.js
import imagekit from "../config/imagekit.js";

export const uploadImage = async (file, fileName) => {
  return await imagekit.upload({
    file, // base64 or file buffer
    fileName,
    folder: "/ecommerce", // optional folder
    useUniqueFileName: true,
  });
};
