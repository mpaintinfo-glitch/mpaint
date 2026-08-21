// Vercel's serverless functions hard-reject any request body over 4.5MB
// (FUNCTION_PAYLOAD_TOO_LARGE) before our own code - including the
// server-side sharp compression in mailer.ts - ever runs. Modern phone
// photos are routinely 3-12MB each, so uploading a couple of them
// uncompressed silently failed the whole form. Compressing in the browser
// before upload keeps the request comfortably under that limit.
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.75;

export async function compressImage(file: File): Promise<File> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // Format the browser can't decode (rare) - upload as-is rather than
    // silently dropping the photo.
    return file;
  }

  let { width, height } = bitmap;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
  if (!blob) return file;

  const baseName = (file.name || "photo").replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}
