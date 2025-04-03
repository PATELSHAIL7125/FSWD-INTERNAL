// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// app.use("/api/images", require("./routes/imageRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get directory name properly in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:5174", // Allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON bodies
app.use(express.json());

// Set up static files directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// In-memory storage for images (replace with a database in production)
let images = [];

// Routes
app.get("/api/images", (req, res) => {
  res.json(images);
});

app.post("/api/images", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { title, tags } = req.body;
    const tagArray = tags.split(",").map(tag => tag.trim());
    
    const newImage = {
      id: Date.now().toString(),
      title,
      tags: tagArray,
      url: `http://localhost:5000/uploads/${req.file.filename}`
    };
    
    images.push(newImage);
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Image Gallery API is running!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

export default app;