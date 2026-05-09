import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

dotenv.config();

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticate, isAdmin, upload.single("file"), async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó archivo" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinaryV2.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary error:", error);
              reject(error);
            }
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    console.log("Upload success:", result.secure_url);
    
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: error.message || "Error al subir la imagen" });
  }
});

export default router;