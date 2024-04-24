import express from 'express';
import validate from '../middlewares/validate.cookies';
import authController from '../controllers/auth.controller';
import user from '../controllers/user';
import uploadToMemory from '../config/multer';

const userRoute = express.Router();

userRoute.post('/auth/login', authController.login);
userRoute.post('/auth/req-otp', authController.reqOTP);

userRoute.use(validate.cookie);
userRoute.get('/profile', user.profile);
userRoute.get('/profile/:id', user.getProfile);
userRoute.put('/profile/setup', uploadToMemory.single('profile'), user.setupProfile);

export default userRoute;
