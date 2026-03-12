import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ff7e01"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema); 