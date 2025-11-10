import imageCompression from 'browser-image-compression';

export interface CompressImageOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
}

/**
 * Compress an image file to the smallest size without compromising quality
 * Default settings optimized for web display
 */
export async function compressImage(
  file: File,
  options?: CompressImageOptions
): Promise<File> {
  const defaultOptions = {
    maxSizeMB: 0.5, // Max 500KB
    maxWidthOrHeight: 1920, // Max dimension
    useWebWorker: true,
    fileType: 'image/webp', // WebP for better compression
    initialQuality: 0.85, // Start with 85% quality
  };

  const compressionOptions = { ...defaultOptions, ...options };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);

    console.info('Image compression:', {
      originalSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      compressedSize: `${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
      reduction: `${(((file.size - compressedFile.size) / file.size) * 100).toFixed(1)}%`,
    });

    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
}

/**
 * Compress profile/avatar image (square, smaller size)
 */
export async function compressProfileImage(file: File): Promise<File> {
  return compressImage(file, {
    maxSizeMB: 0.3, // 300KB max for profile
    maxWidthOrHeight: 800, // 800px for profile
    fileType: 'image/webp',
  });
}

/**
 * Compress cover image (wide, larger size)
 */
export async function compressCoverImage(file: File): Promise<File> {
  return compressImage(file, {
    maxSizeMB: 0.8, // 800KB max for cover
    maxWidthOrHeight: 1920, // 1920px for cover
    fileType: 'image/webp',
  });
}

/**
 * Create a cropped image from canvas
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  fileName: string = 'cropped-image.webp'
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Set canvas size to match crop area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], fileName, { type: 'image/webp' });
        resolve(file);
      },
      'image/webp',
      0.95 // High quality for cropped image (will be compressed later)
    );
  });
}

/**
 * Create an image element from source
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

/**
 * Get the pixel crop coordinates from crop percentage
 */
export function getPixelCrop(
  crop: { x: number; y: number; width: number; height: number },
  imageWidth: number,
  imageHeight: number
): { x: number; y: number; width: number; height: number } {
  return {
    x: (crop.x * imageWidth) / 100,
    y: (crop.y * imageHeight) / 100,
    width: (crop.width * imageWidth) / 100,
    height: (crop.height * imageHeight) / 100,
  };
}

/**
 * Validate image file type
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Validate image file size (before compression)
 */
export function isValidImageSize(file: File, maxSizeMB: number = 10): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Upload image to Vercel Blob via API endpoint
 */
export async function uploadImageToBlob(
  file: File,
  type: 'profile' | 'cover',
  slug: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('slug', slug);

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload image');
  }

  const data = await response.json();
  return data.url;
}
