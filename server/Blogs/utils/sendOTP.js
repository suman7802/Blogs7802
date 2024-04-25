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
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const keys_1 = require("../config/keys");
const { OAuth2 } = googleapis_1.google.auth;
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = new OAuth2(keys_1.NODEMAILER_CLIENT_ID, keys_1.NODEMAILER_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
    oauth2Client.setCredentials({
        refresh_token: keys_1.NODEMAILER_REFRESH_TOKEN,
    });
    const accessToken = yield new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((error, token) => {
            if (error)
                reject(error);
            resolve(token);
        });
    });
    return nodemailer_1.default.createTransport({
        // @ts-ignore
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: keys_1.USER_EMAIL,
            accessToken,
            clientId: keys_1.NODEMAILER_CLIENT_ID,
            clientSecret: keys_1.NODEMAILER_CLIENT_SECRET,
            refreshToken: keys_1.NODEMAILER_REFRESH_TOKEN,
        },
    });
});
function sendOTP(otp, email) {
    const emailConfig = {
        from: keys_1.USER_EMAIL,
        subject: 'OTP Verification',
        text: `Your OTP is : ${otp}\nExpiring in 3 minute..`,
        to: email,
    };
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        return yield createTransporter().then((transporter) => {
            transporter.sendMail(emailConfig, (err, info) => {
                if (err)
                    return reject(err);
                return resolve(info);
            });
        });
    }));
}
exports.default = sendOTP;
