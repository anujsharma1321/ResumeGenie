
import express from 'express';
import Review from '../models/Review.js';
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {     
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD
    }
});
const router = express.Router();
router.post('/send-email/:id', async (req, res) => {
  const { to, subject } = req.body;
  const  id  = req.params.id;
  try {
    const data = await Review.findOne({_id:id});
    
   
    
    if (!data) return res.json({ message: 'User not found' });

     var mailOptions = {
                from : process.env.GMAIL_USER,
                to,
                subject ,
               html:` <p><span style="font-size:18px">Dear User,</span></p>

<h2><span style="color:green">Your Resume Review is Ready!</span></h2>

<br />

<div style="font-size:16px; line-height:1.6">
  <strong>Grammar:</strong><br />
     ${data.feedback.grammar}
  <br /><br />

  <strong>Presentation:</strong><br />
  ${data.feedback.presentation}
  <br /><br />

  <strong>Skills:</strong><br />
  ${data.feedback.skills}
  <br /><br />
<strong>Ats Score:</strong><br />
  ${data.atsScore}
  <br /><br />
  <strong>Suggestions:</strong><br />
   ${data.feedback.suggestions}

</div>

<br /><br />

<span style="font-size:18px">
  <strong>Note:</strong> If you did not request this review, please contact us immediately at <a href="mailto:codeverse50@gmail.com">codeverse50@gmail.com</a>.
  <br /><br />
  Thanks,<br />
  Team ResumeGenie
</span>`
            }
            
            try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.json({ success: false });
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;
