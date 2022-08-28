
const {google} =require('googleapis');
const nodemailer =require('nodemailer');
const { verifyEmailTemplate, resetPasswordTemplate } = require('../emailTemplates/emailTemplate');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

async function sendMail(req, user, userEmail, userName){
  try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        },
        tls:{
          rejectUnauthorized: false
        }
      });
      const mailOptions ={
        from: `Email App <${process.env.USER_EMAIL}>`,
        to: `${userName} <${userEmail}>`,
        
        subject: `New Registration ${userName}`,
        html: resetEmailTemplate(user, req),
       }
      const result = await transport.sendMail(mailOptions)
      return result

  }catch(error){
    return error
  }
}
async function sendResetMail(req, user, userEmail, userName){
  try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        },
        tls:{
          rejectUnauthorized: false
        }
      });
      const mailOptions ={
        from: `Email App <${process.env.USER_EMAIL}>`,
        to: `${userName} <${userEmail}>`,
        
        subject: `Reset Password ${userName}`,
        html: resetPasswordTemplate(user, req),
       }
      const result = await transport.sendMail(mailOptions)
      return result

  }catch(error){
    return error
  }
}

module.exports = { sendMail, sendResetMail }