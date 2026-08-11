const MEDIA_URL = process.env.MEDIA_URL;

if (!MEDIA_URL) {
  throw new Error("MEDIA_URL environment variable is not defined");
}

export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${MEDIA_URL}${normalizedPath}`;
}
