import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

import catchAsync from '../errors/catchAsync';
import CustomError from '../errors/customError';
import existingUser from '../utils/existingUser';
import getCreateUser from '../utils/getCreateUser';
import validateEmail from '../utils/validateEmail';
import {JWT_SECRET, COOKIE_NAME, AGE_OF_COOKIE} from '../config/keys';

const ageOfCooke = AGE_OF_COOKIE as number;

const authController = {
  reqOTP: catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email;
    validateEmail(email);
    await getCreateUser(email).then((response) => {
      return res.send(response);
    });
  }),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, OTP} = req.body;

    if (!OTP || !email)
      return next(new CustomError('Required Field not Fulfilled', 400));

    validateEmail(email);

    const user = await existingUser(email);
    if (!user) return next(new CustomError(`User Not Found`, 404));

    if (user.otpExpiry < new Date())
      return next(new CustomError('OTP Expired', 403));

    const validOTP = await bcrypt.compare(OTP, user.otp);
    if (!validOTP) return next(new CustomError('invalid OTP', 400));

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET
    );

    let sanitizedUser = {
      ...user,
      id: undefined,
      otp: undefined,
      otpExpiry: undefined,
      picture: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };

    res
      .status(200)
      .cookie(COOKIE_NAME, JSON.stringify({token}), {
        path: '/',
        secure: false,
        maxAge: ageOfCooke,
      })
      .json({
        user: sanitizedUser,
        token,
      });
  }),
};

export default authController;
