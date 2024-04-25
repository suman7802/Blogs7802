"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_model_1 = __importDefault(require("../models/db.model"));
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const customError_1 = __importDefault(require("../errors/customError"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const blog = {
    create: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            throw new customError_1.default(`Not Found`, 404);
        const id = Number(req.user.id);
        let pictureUrl = '';
        if (req.file)
            pictureUrl = yield (0, cloudinary_1.default)(req.file);
        const privateValue = JSON.parse(req.body.private);
        const updateUser = yield db_model_1.default.blog.create({
            data: {
                user: { connect: { id } },
                title: req.body.title,
                content: req.body.content,
                private: privateValue,
                picture: pictureUrl,
            },
        });
        res.status(202).send(updateUser);
    })),
    readAll: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = Number(req.query.skip) || 0; ///blogs?skip=5
        const blogs = yield db_model_1.default.blog.findMany({
            where: { private: false },
            include: { user: { select: { name: true, profile: true, id: true } } },
            take: 5,
            skip: skip,
        });
        res.status(200).send(blogs);
    })),
    readOne: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let blog;
        if (req.user)
            blog = yield db_model_1.default.blog.findUnique({
                where: {
                    id: Number(req.params.id),
                    userId: Number(req.user.id),
                },
                include: { user: { select: { name: true } } },
            });
        else
            blog = yield db_model_1.default.blog.findUnique({
                where: {
                    id: Number(req.params.id),
                    private: false,
                },
                include: { user: { select: { name: true } } },
            });
        if (!blog)
            throw new customError_1.default(`Not Found`, 404);
        res.status(200).send(blog);
    })),
    update: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!req.user)
            throw new customError_1.default(`Not Found`, 404);
        const id = Number(req.user.id);
        const blogId = Number(req.params.id);
        const blog = yield db_model_1.default.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog || blog.userId !== id)
            throw new customError_1.default(`Not Found`, 404);
        let pictureUrl = blog.picture;
        if (req.file)
            pictureUrl = yield (0, cloudinary_1.default)(req.file);
        const privateValue = JSON.parse(req.body.private);
        const updateBlog = yield db_model_1.default.blog.update({
            where: { id: blogId },
            data: {
                title: (_a = req.body.title) !== null && _a !== void 0 ? _a : blog.title,
                content: (_b = req.body.content) !== null && _b !== void 0 ? _b : blog.content,
                private: privateValue !== null && privateValue !== void 0 ? privateValue : blog.private,
                picture: pictureUrl,
            },
        });
        res.status(202).send(updateBlog);
    })),
    delete: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            throw new customError_1.default(`Not Found`, 404);
        const id = Number(req.user.id);
        const blogId = Number(req.params.id);
        const blog = yield db_model_1.default.blog.findUnique({
            where: { id: blogId },
            select: { userId: true },
        });
        if (!blog || blog.userId !== id)
            throw new customError_1.default(`Not Found`, 404);
        yield db_model_1.default.blog.delete({ where: { id: blogId } });
        res
            .status(204)
            .send(`Blog with id: ${blogId} has been deleted successfully`);
    })),
};
exports.default = blog;
