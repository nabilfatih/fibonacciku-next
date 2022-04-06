import crypto from "crypto";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fibonacciku-profile",
    allowedFormats: ["jpeg", "jpg", "png"],
    transformation: { width: 356, height: 356, crop: "crop" },
  },
  filename: function (req, file, cb) {
    let buf = crypto.randomBytes(16);
    buf = buf.toString("hex");
    let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, "");
    uniqFileName += buf;
    cb(undefined, uniqFileName);
  },
});

export { cloudinary, storage };
