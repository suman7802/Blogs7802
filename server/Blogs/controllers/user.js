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
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const customError_1 = __importDefault(require("../errors/customError"));
const user = {
    setupProfile: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            throw new customError_1.default(`Not Found`, 404);
        const image = req.file;
        const id = Number(req.user.id);
        const profileUrl = yield (0, cloudinary_1.default)(image);
        const updateUser = yield db_model_1.default.user.update({
            where: { id },
            data: {
                name: req.body.name,
                profile: profileUrl || '',
            },
        });
        res.status(202).send(updateUser);
    })),
    profile: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            throw new customError_1.default(`Not Found`, 404);
        const id = Number(req.user.id);
        const user = yield db_model_1.default.user.findUnique({
            where: { id },
            select: {
                name: true,
                profile: true,
                Blog: true,
            },
        });
        const totalBlogs = yield db_model_1.default.blog.count({
            where: { userId: id },
        });
        res.status(200).send(Object.assign(Object.assign({}, user), { totalBlogs }));
    })),
    getProfile: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userid = Number(req.params.id);
        if (req.user) {
            const id = Number(req.user.id);
            if (id === userid) {
                const user = yield db_model_1.default.user.findUnique({
                    where: { id: userid },
                    select: {
                        name: true,
                        profile: true,
                        Blog: true,
                    },
                });
                const totalBlogs = yield db_model_1.default.blog.count({
                    where: { userId: userid },
                });
                res.status(200).send(Object.assign(Object.assign({}, user), { totalBlogs }));
            }
        }
        else {
            const user = yield db_model_1.default.user.findUnique({
                where: { id: userid },
                select: {
                    name: true,
                    profile: true,
                    Blog: {
                        where: { private: false },
                    },
                },
            });
            const totalBlogs = yield db_model_1.default.blog.count({
                where: { userId: userid, private: false },
            });
            res.status(200).send(Object.assign(Object.assign({}, user), { totalBlogs }));
        }
    })),
};
exports.default = user;
