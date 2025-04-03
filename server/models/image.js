import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  tags: [String]
}, { timestamps: true });

export default mongoose.model("Image", ImageSchema);
