'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/ui/image-cropper';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import {
  compressProfileImage,
  compressCoverImage,
  uploadImageToBlob,
  isValidImageType,
  isValidImageSize,
} from '@/lib/image-utils';

interface ImageUploadFieldProps {
  type: 'profile' | 'cover';
  value?: string;
  onChange: (url: string) => void;
  slug: string;
  label: string;
  description?: string;
  aspect?: number;
  required?: boolean;
}

export function ImageUploadField({
  type,
  value,
  onChange,
  slug,
  label,
  description,
  aspect = type === 'profile' ? 1 : 16 / 9,
  required = false,
}: ImageUploadFieldProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!isValidImageType(file)) {
      alert('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    // Validate file size (max 10MB before compression)
    if (!isValidImageSize(file, 10)) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
    setCropperOpen(true);
  };

  const handleCropComplete = async (croppedFile: File) => {
    setCropperOpen(false);
    setIsUploading(true);

    try {
      // Step 1: Compress the cropped image
      setUploadProgress('Compressing image...');
      const compressedFile =
        type === 'profile'
          ? await compressProfileImage(croppedFile)
          : await compressCoverImage(croppedFile);

      console.info(`Compression complete: ${(compressedFile.size / 1024).toFixed(2)}KB`);

      // Step 2: Upload to Vercel Blob
      setUploadProgress('Uploading to cloud...');
      const url = await uploadImageToBlob(compressedFile, type, slug);

      console.info(`Upload complete: ${url}`);

      // Step 3: Update form value
      onChange(url);
      setUploadProgress('');

      // Cleanup
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image');
      setUploadProgress('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setCropperOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div className="space-y-4">
        {/* Upload Area */}
        {!value && !isUploading && (
          <div
            onClick={handleUploadClick}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/5 ${
              type === 'cover' ? 'aspect-video' : 'aspect-square max-w-xs mx-auto'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">Click to upload {type} image</p>
                <p className="text-sm text-muted-foreground">
                  JPEG, PNG, or WebP (max 10MB)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: {type === 'profile' ? '800x800px' : '1920x1080px'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Uploading State */}
        {isUploading && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              type === 'cover' ? 'aspect-video' : 'aspect-square max-w-xs mx-auto'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <div>
                <p className="font-medium">Processing image...</p>
                <p className="text-sm text-muted-foreground">{uploadProgress}</p>
              </div>
            </div>
          </div>
        )}

        {/* Preview Uploaded Image */}
        {value && !isUploading && (
          <div className="relative group">
            <div
              className={`border rounded-lg overflow-hidden ${
                type === 'cover' ? 'aspect-video' : 'aspect-square max-w-xs mx-auto'
              }`}
            >
              <img
                src={value}
                alt={`${type} preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleUploadClick}
                className="gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Remove
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Image Cropper Modal */}
      {previewUrl && selectedFile && (
        <ImageCropper
          image={previewUrl}
          aspect={aspect}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          open={cropperOpen}
          fileName={`${slug}-${type}.webp`}
          type={type}
        />
      )}
    </div>
  );
}
