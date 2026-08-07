export interface Product {
  id: number;
  name: string;
  slug: string;

  shortDescription: string | null;

  featured: boolean;

  status: "DRAFT" | "PUBLISHED";

  createdAt: string;

  updatedAt: string;
}

export interface ProductListResponse {
  data: Product[];
}
