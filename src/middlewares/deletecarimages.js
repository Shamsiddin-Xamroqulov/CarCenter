import { v2 as cloudinary } from 'cloudinary';
import { connectionDb } from '../lib/conection.js';

export const deleteCarImagesFromCloudinary = async (req, res, next) => {
  try {
    const { id } = req.params;

    // carImages dan rasm linklarini olish
    const [images] = await connectionDb.query(
      `SELECT image_url FROM carImages WHERE car_id = ?`,
      [id]
    );

    if (images.length === 0) {
      console.log('No images found for this car.');
      return next(); // Davom etaveramiz
    }

    for (const img of images) {
      // public_id ni ajratib olish (Cloudinary formatda bo'lsa)
      const segments = img.image_url.split('/');
      const fileWithExt = segments[segments.length - 1]; // example.jpg
      const publicId = fileWithExt.split('.')[0]; // example

      // Cloudinary'dan o‘chirish
      await cloudinary.uploader.destroy(publicId);
    }

    next(); // Davom etamiz
  } catch (err) {
    console.error('Cloudinary image delete error:', err);
    return res.status(500).json({ message: 'Error deleting images from Cloudinary' });
  }
};
