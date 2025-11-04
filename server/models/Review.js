import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  id:String,
  resumeText: String,
  feedback: Object,
  atsScore: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);
