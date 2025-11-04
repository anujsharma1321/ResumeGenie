import mongoose from "mongoose";

const usersData = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth:String ,
  gender: String ,
  location:String ,
  skills: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("users", usersData);
