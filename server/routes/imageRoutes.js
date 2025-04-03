import express from "express";
import Image from "../models/image.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Upload Image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, tags } = req.body;
    const newImage = new Image({
      title,
      url: req.file.path,
      tags: tags.split(",").map(tag => tag.trim())
    });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Images (with optional tag filter)
router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;
    const query = tag ? { tags: tag } : {};
    const images = await Image.find(query);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Image (Optional)
router.delete("/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
