const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOTP(email, otp) {
  const mailOptions = {
    from: '"Shivashish Properties" <shivashishproperties@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP for <strong>Shivashish Properties</strong> verification is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
  };
  

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendOTP };

//danceplus06h@gmail.com

