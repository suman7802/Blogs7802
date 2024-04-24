import {v2 as cloudinary} from 'cloudinary';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from './keys';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default async function uploadPhoto(photo: any): Promise<string> {
  const image = await cloudinary.uploader.upload(`data:${photo.mimetype};base64,${photo.buffer.toString('base64')}`, {
    resource_type: `image`,
    folder: `blogs`,
    public_id: `${photo.originalname.split('.')[0]}-${Date.now()}`,
  });
  return image.secure_url;
}
