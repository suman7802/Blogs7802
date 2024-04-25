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
const otp_generator_1 = __importDefault(require("otp-generator"));
function generateOTP() {
    return __awaiter(this, void 0, void 0, function* () {
        const OTP = otp_generator_1.default.generate(5, {
            digits: true,
            upperCaseAlphabets: true,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log('otp:', OTP);
        const hashedOTP = yield bcryptjs_1.default.hash(OTP, 10);
        return { OTP, hashedOTP };
    });
}
exports.default = generateOTP;
