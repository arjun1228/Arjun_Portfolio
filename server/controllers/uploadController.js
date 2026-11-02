import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided for upload',
        data: null
      });
    }

    // If Cloudinary credentials are present in env, upload to Cloudinary
    if (isCloudinaryConfigured) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'portfolio',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const result = await uploadPromise;

      return res.json({
        success: true,
        message: 'Image uploaded successfully to Cloudinary',
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format
        }
      });
    }

    // Fallback when Cloudinary is not configured: convert buffer to base64 Data URI
    const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    return res.json({
      success: true,
      message: 'Image processed as Data URI (Cloudinary credentials not provided)',
      data: {
        url: base64Data,
        public_id: 'local_' + Date.now(),
        format: req.file.mimetype.split('/')[1]
      }
    });
  } catch (error) {
    next(error);
  }
};
