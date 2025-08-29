import nodemailer, { SendMailOptions } from "nodemailer";
import { google } from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRETE,
    "https://developers.google.com/oauthplayground"
);
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
const createTransporter = async () => {

  const accessToken = await oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRETE,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  } as SMTPTransport.Options);
  return transporter;
};

export const sendMail = async (mailOptions: SendMailOptions) => {
  try {
    const emailTransporter = await createTransporter();

    await emailTransporter.sendMail(mailOptions);
    console.log("mail sent successfully");
  } catch (error) {
    console.log("error sending mail :", error);
  }
};
