import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

import asyncCatch from '../errors/catchAsync';
import {COOKIE_NAME, JWT_SECRET} from '../config/keys';

const validate = {
  cookie: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const cookie = req.cookies[COOKIE_NAME];
      if (!cookie) return next();
      const {token} = JSON.parse(cookie);
      const user: any = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    }
  ),
};

export default validate;
