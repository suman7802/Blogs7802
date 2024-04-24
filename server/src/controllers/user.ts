import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import uploadPhoto from '../config/cloudinary';
import CustomError from '../errors/customError';
import {NextFunction, Request, Response} from 'express';

const user = {
  setupProfile: asyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) throw new CustomError(`Not Found`, 404);

      const image = req.file;
      const id = Number(req.user.id);

      const profileUrl = await uploadPhoto(image);

      const updateUser = await prisma.user.update({
        where: {id},
        data: {
          name: req.body.name,
          profile: profileUrl || '',
        },
      });

      res.status(202).send(updateUser);
    }
  ),

  profile: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);

    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        name: true,
        profile: true,
        Blog: true,
      },
    });

    const totalBlogs = await prisma.blog.count({
      where: {userId: id, private: false},
    });

    res.status(200).send({...user, totalBlogs});
  }),

  getProfile: asyncCatch(async (req: Request, res: Response) => {
    const userid = Number(req.params.id);

    if (req.user) {
      const id = Number(req.user.id);

      if (id === userid) {
        const user = await prisma.user.findUnique({
          where: {id: userid},
          select: {
            name: true,
            profile: true,
            Blog: true,
          },
        });

        const totalBlogs = await prisma.blog.count({
          where: {userId: userid},
        });

        res.status(200).send({...user, totalBlogs});
      }
    } else {
      const user = await prisma.user.findUnique({
        where: {id: userid},
        select: {
          name: true,
          profile: true,
          Blog: {
            where: {private: false},
          },
        },
      });

      const totalBlogs = await prisma.blog.count({
        where: {userId: userid, private: false},
      });

      res.status(200).send({...user, totalBlogs});
    }
  }),
};

export default user;
