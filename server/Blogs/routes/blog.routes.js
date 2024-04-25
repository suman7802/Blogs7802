"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("../controllers/blog"));
const multer_1 = __importDefault(require("../config/multer"));
const validate_cookies_1 = __importDefault(require("../middlewares/validate.cookies"));
const blogRoute = express_1.default.Router();
blogRoute.get('/blogs', blog_1.default.readAll);
blogRoute.use(validate_cookies_1.default.cookie);
blogRoute.get('/blogs/:id', blog_1.default.readOne);
blogRoute.delete('/blogs/:id', blog_1.default.delete);
blogRoute.post('/blogs', multer_1.default.single('picture'), blog_1.default.create);
blogRoute.put('/blogs/:id', multer_1.default.single('picture'), blog_1.default.update);
exports.default = blogRoute;
