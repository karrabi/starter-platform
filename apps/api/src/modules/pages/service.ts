import type { CreatePageData, UpdatePageData } from "./repository";

import { PagesRepository } from "./repository";

export class PagesService {
  constructor(private readonly repository = new PagesRepository()) {}

  getAll() {
    return this.repository.findAll();
  }

  getPublished() {
    return this.repository.findPublished();
  }

  getById(id: number) {
    return this.repository.findById(id);
  }

  getPublishedBySlug(slug: string) {
    return this.repository.findPublishedBySlug(slug);
  }

  create(data: CreatePageData) {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdatePageData) {
    const page = await this.repository.findById(id);

    if (!page) {
      return null;
    }

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const page = await this.repository.findById(id);

    if (!page) {
      return null;
    }

    return this.repository.delete(id);
  }
}
