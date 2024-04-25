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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const customError_1 = __importDefault(require("../errors/customError"));
const existingUser_1 = __importDefault(require("../utils/existingUser"));
const getCreateUser_1 = __importDefault(require("../utils/getCreateUser"));
const validateEmail_1 = __importDefault(require("../utils/validateEmail"));
const keys_1 = require("../config/keys");
const ageOfCooke = keys_1.AGE_OF_COOKIE;
const authController = {
    reqOTP: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email;
        (0, validateEmail_1.default)(email);
        yield (0, getCreateUser_1.default)(email).then((response) => {
            return res.send(response);
        });
    })),
    login: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, OTP } = req.body;
        if (!OTP || !email)
            return next(new customError_1.default('Required Field not Fulfilled', 400));
        (0, validateEmail_1.default)(email);
        const user = yield (0, existingUser_1.default)(email);
        if (!user)
            return next(new customError_1.default(`User Not Found`, 404));
        if (user.otpExpiry < new Date())
            return next(new customError_1.default('OTP Expired', 403));
        const validOTP = yield bcryptjs_1.default.compare(OTP, user.otp);
        if (!validOTP)
            return next(new customError_1.default('invalid OTP', 400));
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, keys_1.JWT_SECRET);
        let sanitizedUser = Object.assign(Object.assign({}, user), { id: undefined, otp: undefined, otpExpiry: undefined, picture: undefined, createdAt: undefined, updatedAt: undefined });
        res
            .status(200)
            .cookie(keys_1.COOKIE_NAME, JSON.stringify({ token }), {
            path: '/',
            secure: false,
            maxAge: ageOfCooke,
        })
            .json({
            user: sanitizedUser,
            token,
        });
    })),
};
exports.default = authController;
