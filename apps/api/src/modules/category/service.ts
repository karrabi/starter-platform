import type { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import type { CategoryType } from "@prisma/client";

import { CategoryRepository } from "./repository";

export class CategoryService {
  constructor(private readonly repository = new CategoryRepository()) {}

  getAll() {
    return this.repository.findAll();
  }

  getByType(type: CategoryType) {
    return this.repository.findByType(type);
  }

  getById(id: number) {
    return this.repository.findById(id);
  }

  create(data: CreateCategoryDto) {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.repository.findById(id);

    if (!category) {
      return null;
    }

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const category = await this.repository.findById(id);

    if (!category) {
      return null;
    }

    return this.repository.delete(id);
  }
}
