const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error("SITE_URL environment variable is not defined");
}

const SITE_URL: string = siteUrl;

export function getSiteUrl(path = ""): string {
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;

  return `${SITE_URL}${normalizedPath}`;
}

export function getSiteOrigin(): string {
  return SITE_URL;
}
