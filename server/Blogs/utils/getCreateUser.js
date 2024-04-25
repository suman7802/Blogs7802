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
const sendOTP_1 = __importDefault(require("./sendOTP"));
const generateOTP_1 = __importDefault(require("./generateOTP"));
const client_1 = require("@prisma/client");
const existingUser_1 = __importDefault(require("./existingUser"));
const keys_1 = require("../config/keys");
const prisma = new client_1.PrismaClient();
const isLocal = keys_1.NODE_ENV === 'development';
function getCreateUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, existingUser_1.default)(email);
        if (!user) {
            const { hashedOTP, OTP } = yield (0, generateOTP_1.default)();
            if (!isLocal)
                yield (0, sendOTP_1.default)(OTP, email);
            const newUser = yield prisma.user.create({
                data: {
                    email,
                    otp: hashedOTP,
                    otpExpiry: new Date(Date.now() + 60000 * 3),
                },
            });
            return {
                email: newUser.email,
                OTPExpire: newUser.otpExpiry,
            };
        }
        const OTPExpire = new Date(Date.now()) > user.otpExpiry;
        if (OTPExpire) {
            const { hashedOTP, OTP } = yield (0, generateOTP_1.default)();
            if (!isLocal)
                yield (0, sendOTP_1.default)(OTP, email);
            const updatedUser = yield prisma.user.update({
                where: { email },
                data: {
                    otp: hashedOTP,
                    otpExpiry: new Date(Date.now() + 60000 * 3),
                },
            });
            return {
                email: updatedUser.email,
                OTPExpire: updatedUser.otpExpiry,
            };
        }
        else {
            return {
                alreadySent: true,
                OTPExpire: user.otpExpiry,
            };
        }
    });
}
exports.default = getCreateUser;
