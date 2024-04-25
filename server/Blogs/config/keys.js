"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_REFRESH_TOKEN = exports.NODEMAILER_CLIENT_SECRET = exports.NODEMAILER_CLIENT_ID = exports.USER_EMAIL = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_KEY = exports.DATABASE_URL = exports.AGE_OF_COOKIE = exports.COOKIE_NAME = exports.ALLOW_ORIGIN = exports.JWT_SECRET = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// server config 
exports.PORT = process.env.PORT || 8000;
exports.NODE_ENV = process.env.NODE_ENV;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;
// cookie config
exports.COOKIE_NAME = process.env.COOKIE_NAME;
exports.AGE_OF_COOKIE = process.env.AGE_OF_COOKIE || 1000 * 60 * 60 * 24 * 365;
// database config
exports.DATABASE_URL = process.env.DATABASE_URL;
// cloudinary config
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
// email config
exports.USER_EMAIL = process.env.USER_EMAIL;
exports.NODEMAILER_CLIENT_ID = process.env.NODEMAILER_CLIENT_ID;
exports.NODEMAILER_CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET;
exports.NODEMAILER_REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN;
