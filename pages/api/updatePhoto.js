import cloudinary from "../../lib/cloudinary";
import { storage } from "../../lib/cloudinary";
import multer from "multer";

const upload = multer({ storage: storage });
