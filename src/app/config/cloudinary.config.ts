import { v2 as cloudinary } from 'cloudinary';
import config from '.';
cloudinary.config({
  cloud_name: config.cloudinary_cloudName,
  api_key: config.cloudinary_apiKey,
  api_secret: config.cloudinary_secretKey,
});

export default cloudinary;
