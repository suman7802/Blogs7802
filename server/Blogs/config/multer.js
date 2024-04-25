"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const memoryStorage = multer_1.default.memoryStorage();
const uploadToMemory = (0, multer_1.default)({ storage: memoryStorage });
exports.default = uploadToMemory;
