import dotenv from 'dotenv';
dotenv.config();

// server config 
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN as string;


// cookie config
export const COOKIE_NAME = process.env.COOKIE_NAME as string;
export const AGE_OF_COOKIE = process.env.AGE_OF_COOKIE || 1000 * 60 * 60 * 24 * 365;

// database config
export const DATABASE_URL = process.env.DATABASE_URL as string;


// cloudinary config
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;



// email config
export const USER_EMAIL = process.env.USER_EMAIL as string;
export const NODEMAILER_CLIENT_ID = process.env.NODEMAILER_CLIENT_ID as string;
export const NODEMAILER_CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET as string;
export const NODEMAILER_REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN as string;
