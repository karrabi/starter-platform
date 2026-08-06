import type { Prisma } from "@prisma/client";

export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: number;
  schemaMarkup?: Record<string, unknown>;
}

export type SeoJson = Prisma.InputJsonValue;
