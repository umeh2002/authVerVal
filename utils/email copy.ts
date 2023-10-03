import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "72356347044-qj7re6pj9lc6onng45o5f6s6k9qk9q67.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN =
  "1//04MqTYFdM3id7CgYIARAAGAQSNwF-L9IrhmxdcF8sTqSaJSS8Lv1f-_iLfvi1hRvt0Qtp20jxc67s7GtoQrn5SKJXIbwFD-hlNJ4";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });

const url: string = "http://localhost:3678";

export const sendAccountOpeningMail = async (user: any, tokenID: string) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const passedData = {
      userName: user.name,
      url: `${url}/api/${tokenID}/verify`,
    };

    const readData = path.join(__dirname, "../views/index copy.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <eumeh3882@gmail.com > ",
      to: user.email,
      subject:
        "Welcome to AJ LAW Constituency, Where Ajegunle's Laws are clarified and properly interpreted!",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const resetAccountPassword = async (user: any, tokenID: string) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const passedData = {
      userName: user.name,
      url: `${url}/api/${tokenID}/reset-password`,
    };

    const readData = path.join(__dirname, "../views/resetPassword.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <eumeh3882@gmail.com > ",
      to: user.email,
      subject:
        "Welcome to AJ LAW Constituency, you can now reset your password",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
