const nodemailer = require("nodemailer");
const User = require("../models/User.js");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: "aryanofficialjain@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `CODE - ${code}`,
    html: `YOUR VERIFY CODE - <h1>${code}<h1/>`,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log("verification Email is sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};


module.exports = sendVerificationCode;