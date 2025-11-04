import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/reviewController.js";
import Review from "../models/Review.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), analyzeResume);
router.get("/resume-reviews/:id",async(req,res)=>{
    try {
        const review = await Review.find({id:req.params.id});
        if (!review) return res.status(404).json({ message: 'User not found' });
        res.json(review);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});
router.delete("/delete/:id", async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }});
router.get("/view-details/:id", async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(review);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }});
export default router;