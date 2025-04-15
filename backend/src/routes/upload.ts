// File: backend/src/routes/upload.ts
// This file handles the image upload functionality for the backend of the Crop Disease Detector application.
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Store uploaded files in backend/uploads/
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  console.log("✅ Image received:", req.file.filename);

  // Here we’ll call Python ML model in next steps
  res.json({ message: "Image uploaded successfully", filename: req.file.filename });
});

export default router;
