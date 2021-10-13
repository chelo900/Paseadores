const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID);
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


const googleVerify = async function ( token = '' ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

    console.log(payload)
}

    
module.exports = {
  getTokenValidation,
  sendEmail,
  googleVerify
};
