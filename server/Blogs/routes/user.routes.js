"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_cookies_1 = __importDefault(require("../middlewares/validate.cookies"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_1 = __importDefault(require("../controllers/user"));
const multer_1 = __importDefault(require("../config/multer"));
const userRoute = express_1.default.Router();
userRoute.post('/auth/login', auth_controller_1.default.login);
userRoute.post('/auth/req-otp', auth_controller_1.default.reqOTP);
userRoute.use(validate_cookies_1.default.cookie);
userRoute.get('/profile', user_1.default.profile);
userRoute.get('/profile/:id', user_1.default.getProfile);
userRoute.put('/profile/setup', multer_1.default.single('profile'), user_1.default.setupProfile);
exports.default = userRoute;
