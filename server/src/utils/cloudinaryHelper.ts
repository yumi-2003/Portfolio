import cloudinary from "../config/cloudinary.js";

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
}

/**
 * Uploads a file buffer to Cloudinary
 */
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string = "portfolio",
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url && result?.public_id) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject(new Error("Cloudinary upload failed: missing secure_url or public_id"));
        }
      },
    );
    stream.end(fileBuffer);
  });
};

/**
 * Deletes an image from Cloudinary
 */
export const deleteFromCloudinary = async (public_id: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error(`Failed to delete asset ${public_id} from Cloudinary:`, error);
    // We don't necessarily want to crash the request if Cloudinary delete fails,
    // but in a production app you might want more robust error handling.
  }
};
