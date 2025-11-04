
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/usersData.js';
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {     
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD
    }
});
const router = express.Router();
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: 'Invalid credentials' });
     var mailOptions = {
                from : process.env.GMAIL_USER,
                to : email ,
                subject : 'ResumeGenie - Login Successfully ✔' ,
                html : `<p><span style="font-size:18px">Dear User&nbsp;</span></p>&nbsp;<h1><span style="color:green">You have successfully logged in using email `+email+`<span></h1><br /><span style="font-size:18px"><strong>Note :If you did not logged in, please connect with us immediately at codeverse50@gmail.com&nbsp;
                </strong><br /><br /><br />Thanks,<br/>Team ResumeGenie</span>`
            }
            
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email sent: " + info.response );
                }
        })
    res.json({ user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
