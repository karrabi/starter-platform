export type PageContent = {
  heading?: string;
  body?: string;
  [key: string]: unknown;
};

export type PageSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImageId?: number | null;
};

export type PublicPage = {
  id: number;
  title: string;
  slug: string;
  content: PageContent;
  status: "PUBLISHED";
  seo: PageSeo | null;
  createdAt: string;
  updatedAt: string;
};
