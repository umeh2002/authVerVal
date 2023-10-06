"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAccountPassword = exports.sendAccountOpeningMail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "8234988124-bsdkkpf67ga2ger27sab514fpf21psb8.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//04mHwQohkG1_vCgYIARAAGAQSNwF-L9IrFdUdrogeOJnb3PaZpXUuXPx1YVL4TLtvPEEkUv8A6splKm4vxKmP0ARplmWZoJS6vL";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const url = "https://ajlawtesting.onrender.com";
// const url2: string = "http://localhost:3678/";
const sendAccountOpeningMail = (user, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajegunlelaw@gmail.com",
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
        const readData = path_1.default.join(__dirname, "../views/index.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: " <ajegunlelaw@gmail.com> ",
            to: user.email,
            subject: "Welcome to AJ LAW Constituency, Where Ajegunle's Laws are clarified and properly interpreted!",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAccountOpeningMail = sendAccountOpeningMail;
const resetAccountPassword = (user, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajegunlelaw@gmail.com",
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
        const readData = path_1.default.join(__dirname, "../views/resetPassword.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: " <ajegunlelaw@gmail.com > ",
            to: user.email,
            subject: "Welcome to AJ LAW Constituency, you can now reset your password",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetAccountPassword = resetAccountPassword;
