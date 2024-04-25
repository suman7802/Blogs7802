import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import {Request, Response} from 'express';
import uploadPhoto from '../config/cloudinary';

const blog = {
  create: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);
    const pictureUrl = await uploadPhoto(req.file);

    const privateValue = JSON.parse(req.body.private);

    const updateUser = await prisma.blog.create({
      data: {
        user: {connect: {id}},
        title: req.body.title,
        content: req.body.content,
        private: privateValue,
        picture: pictureUrl || '',
      },
    });

    res.status(202).send(updateUser);
  }),

  readAll: asyncCatch(async (req: Request, res: Response) => {
    const skip = Number(req.query.skip) || 0; ///blogs?skip=5

    const blogs = await prisma.blog.findMany({
      where: {private: false},
      include: {user: {select: {name: true, profile: true}}},
      take: 5,
      skip: skip,
    });

    res.status(200).send(blogs);
  }),

  readOne: asyncCatch(async (req: Request, res: Response) => {
    let blog;

    if (req.user)
      blog = await prisma.blog.findUnique({
        where: {
          id: Number(req.params.id),
          userId: Number(req.user.id),
        },
        include: {user: {select: {name: true}}},
      });
    else
      blog = await prisma.blog.findUnique({
        where: {
          id: Number(req.params.id),
          private: false,
        },
        include: {user: {select: {name: true}}},
      });

    if (!blog) throw new CustomError(`Not Found`, 404);

    res.status(200).send(blog);
  }),

  update: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);
    const blogId = Number(req.params.id);

    const blog = await prisma.blog.findUnique({
      where: {id: blogId},
    });

    if (!blog || blog.userId !== id) throw new CustomError(`Not Found`, 404);

    let pictureUrl = blog.picture;
    if (req.file) pictureUrl = await uploadPhoto(req.file);

    const privateValue = JSON.parse(req.body.private);

    const updateBlog = await prisma.blog.update({
      where: {id: blogId},
      data: {
        title: req.body.title ?? blog.title,
        content: req.body.content ?? blog.content,
        private: privateValue ?? blog.private,
        picture: pictureUrl,
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

    res
      .status(204)
      .send(`Blog with id: ${blogId} has been deleted successfully`);
  }),
};

export default blog;
