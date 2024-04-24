import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import {COOKIE_NAME, JWT_SECRET} from '../config/keys';

const validate = {
  cookie: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const cookie = req.cookies[COOKIE_NAME];
      if (!cookie) {
        const error = new CustomError('Unauthorized - Missing token', 401);
        return next(error);
      }
      const {token} = JSON.parse(cookie);
      const user: any = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  ),
};

export default validate;
