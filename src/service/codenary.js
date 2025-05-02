// src/services/cloudinary.js
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = new CoreCloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  });
  return cl.url(publicId, scOptions);
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Cloudinary 콘솔에서 설정

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
};