import express from 'express';
import validate from '../middlewares/validate.cookies';
import authController from '../controllers/auth.controller';
import user from '../controllers/user';
import uploadToMemory from '../config/multer';

const userRoute = express.Router();

userRoute.post('/auth/login', authController.login);
userRoute.post('/auth/req-otp', authController.reqOTP);

userRoute.use(validate.cookie);
userRoute.put('/user/setup', uploadToMemory.single('profile'), user.setupProfile);


export default userRoute;
