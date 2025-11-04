import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";    
import reviewRoutes from "./routes/reviewRoutes.js";
import registerRoutes from "./routes/register.js"
import loginRoutes from "./routes/login.js"
import profileRoutes from './routes/profile.js';
import sendEmailRoutes from './routes/email.js';
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
    console.log("✅ MongoDB connected");
}).catch((err)=>console.log(err));   

app.use("/api/review", reviewRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', sendEmailRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
