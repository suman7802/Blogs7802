import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import {NextFunction, Request, Response} from 'express';
import uploadPhoto from '../config/cloudinary';

const blog = {
  create: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const image = req.file;
    const id = Number(req.user.id);

    const pictureUrl = await uploadPhoto(image);

    const updateUser = await prisma.blog.create({
      data: {
        user: {connect: {id}},
        title: req.body.title,
        content: req.body.content,
        private: req.body.private,
        picture: pictureUrl || '',
      },
    });

    res.status(202).send(updateUser);
  }),

  readAll: asyncCatch(async (req: Request, res: Response) => {
    const blogs = await prisma.blog.findMany({
      where: {private: false},
      include: {user: {select: {name: true}}},
    });

    res.status(200).send(blogs);
  }),

  readOne: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
        OR: [{private: false}, {userId: Number(req.user.id)}],
      },
      include: {user: {select: {name: true}}},
    });

    if (!blog) throw new CustomError(`Not Found`, 404);

    res.status(200).send(blog);
  }),

  update: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const image = req.file;
    const id = Number(req.user.id);
    const blogId = Number(req.params.id);

    const blog = await prisma.blog.findUnique({
      where: {id: blogId},
      select: {userId: true},
    });

    if (!blog || blog.userId !== id) throw new CustomError(`Not Found`, 404);

    const pictureUrl = await uploadPhoto(image);

    const updateBlog = await prisma.blog.update({
      where: {id: blogId},
      data: {
        title: req.body.title,
        content: req.body.content,
        private: req.body.private,
        picture: pictureUrl || '',
      },
    });

    res.status(202).send(updateBlog);
  }),

  delete: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);
    const blogId = Number(req.params.id);

    const blog = await prisma.blog.findUnique({
      where: {id: blogId},
      select: {userId: true},
    });

    if (!blog || blog.userId !== id) throw new CustomError(`Not Found`, 404);

    await prisma.blog.delete({where: {id: blogId}});

    res.status(204).send();
  }),
};

export default blog;
