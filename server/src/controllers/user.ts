import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import {NextFunction, Request, Response} from 'express';
import uploadPhoto from '../config/cloudinary';

const user = {
  setupProfile: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) throw new CustomError(`Not Found`, 404);

      const image = req.file;
      const id = Number(req.user.id);

      const imageUrl = await uploadPhoto(image);

      const updateUser = await prisma.user.update({
        where: {id},
        data: {
          name: req.body.name,
          profile: imageUrl || '',
        },
      });

      res.status(202).send(updateUser);
    }
  ),
};

export default user;
