const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { SECRET } = process.env;

const getTokenValidation = (authorization) => {
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET);
    return { isValid: true, token, decodedToken };
  }
  return { isValid: false };
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:"paseadorescuidadores@gmail.com", // generated ethereal user
    pass: "jwubgwmqhjljvbtg", // generated ethereal password
  },
});


  const sendEmail = async function(body){

   const  {from, to, subject, html} = body;

  let info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject:subject, // Subject line
      html: html
    });
    }
    
module.exports = {
  getTokenValidation,
  sendEmail
};
