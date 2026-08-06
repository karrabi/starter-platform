import type { TagType } from "@prisma/client";

export interface CreateTagDto {
  name: string;
  slug: string;
  type: TagType;
  isActive?: boolean;
}

export interface UpdateTagDto {
  name?: string;
  slug?: string;
  type?: TagType;
  isActive?: boolean;
}
