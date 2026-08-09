export type PageStatus = "DRAFT" | "PUBLISHED";

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: Record<string, unknown>;
  status: PageStatus;
  seo?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  content: Record<string, unknown>;
  status: PageStatus;

  seo?: {
    title?: string;
    description?: string;
    ogImageId?: number;
  } | null;
}

export type UpdatePageRequest = Partial<CreatePageRequest>;
