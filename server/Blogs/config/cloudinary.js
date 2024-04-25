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
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const keys_1 = require("./keys");
cloudinary_1.v2.config({
    cloud_name: keys_1.CLOUDINARY_CLOUD_NAME,
    api_key: keys_1.CLOUDINARY_API_KEY,
    api_secret: keys_1.CLOUDINARY_API_SECRET,
});
function uploadPhoto(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = yield cloudinary_1.v2.uploader.upload(`data:${photo.mimetype};base64,${photo.buffer.toString('base64')}`, {
            resource_type: `image`,
            folder: `blogs`,
            public_id: `${photo.originalname.split('.')[0]}-${Date.now()}`,
        });
        return image.secure_url;
    });
}
exports.default = uploadPhoto;
