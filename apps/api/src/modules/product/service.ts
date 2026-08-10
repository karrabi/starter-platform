import type { CreateProductDto, UpdateProductDto } from "./dto";

import { ProductRepository } from "./repository";

export class ProductService {
  constructor(private readonly repository = new ProductRepository()) {}

  getAll() {
    return this.repository.findAll();
  }

  getPublic() {
    return this.repository.findActive();
  }

  getPublicBySlug(slug: string) {
    return this.repository.findActiveBySlug(slug);
  }

  create(data: CreateProductDto) {
    return this.repository.create(data);
  }

  async getById(id: number) {
    return this.repository.findById(id);
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.repository.findById(id);

    if (!product) {
      return null;
    }

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const product = await this.repository.findById(id);

    if (!product) {
      return null;
    }

    return this.repository.delete(id);
  }
}
