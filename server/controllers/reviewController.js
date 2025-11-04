import { extractTextFromPDF } from "../utils/extractText.js";
import { genAI } from "../utils/geminiClient.js";
import Review from "../models/Review.js";

export const analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    const id = req.body.id;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const resumeText = await extractTextFromPDF(file.path); 
    
    const prompt = `
You are an expert resume reviewer.
Evaluate the following resume and return structured JSON feedback.

Resume Text:
${resumeText}

Return JSON with this exact structure:
{
  "presentation": "...",
  "grammar": "...",
  "skills": "...",
  "ats_score": 0-100,
  "suggestions": ["...", "..."]
}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    const feedback = JSON.parse(response.text());
    
    const atsScore = feedback.ats_score || 5;
    const review = await Review.insertOne(
        {id: id, resumeText:resumeText, feedback:feedback, atsScore:atsScore });
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};