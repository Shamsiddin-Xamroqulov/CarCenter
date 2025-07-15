import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "carCenter/carImages",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => `img-${Date.now()}`,
  },
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "carCenter/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => `img-${Date.now()}`,
  },
});

export const upload = multer({ storage });
export const avatarUpload = multer({storage: avatarStorage });

