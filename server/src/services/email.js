require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const emailRouter = express.Router();  

const EMAIL_ADDR = process.env.EMAIL_ADDR;
const EMAIL_PASS = process.env.EMAIL_PASS;


async function sendEmail(to, subject, text, html) {
    // console.log(EMAIL_ADDR, EMAIL_PASS, "email data");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDR,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "MCC <" + EMAIL_ADDR + ">",
        to: [to,process.env.EMAIL_USER],
        subject: subject,
        text: text,
        html: html 
              
    };

    try {
        // console.log()
        const p = await transporter.sendMail(mailOptions);
        return p.response;
        
    } catch (error) {
        console.log('Error sending email:', error);
    }
    
}


emailRouter.post('/sendEmail', async (req, res) => {
    const { to, subject, text, html } = req.body;
    // console.log(to, subject, text, html, "email data");
    const c =await sendEmail(to, subject, text, html);
    if(c){
        return res.status(200).json({ ok: true, message: 'Email sent successfully.' });
    }
    else{
        return res.status(500).json({ ok: false, message: 'Error sending email.' });
    }
    
});

module.exports = emailRouter;