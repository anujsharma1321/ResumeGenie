import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

import Users from "../models/usersData.js";
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'All fields are required.' });
  }
  const existingUser= await Users.findOne({email:email});
  if(existingUser){
    return res.json({ success: false, message: 'User already registered.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    Users.create({ name: name, email:email, password: hashedPassword });

    return res.json({ success: true, message: 'Registration successful.' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.json({ success: false, message: 'Server error. Please try again.' });
  }
});
export default router;  