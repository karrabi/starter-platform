import { TagType } from "@prisma/client";

import { ProductRepository } from "../product/repository";
import { TagRepository } from "../tag/repository";
import { ProductTagRepository } from "./repository";

export class ProductTagService {
  constructor(
    private readonly repository = new ProductTagRepository(),
    private readonly productRepository = new ProductRepository(),
    private readonly tagRepository = new TagRepository(),
  ) {}

  async assign(productId: number, tagId: number) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      return {
        error: "Tag not found",
      };
    }

    if (tag.type !== TagType.PRODUCT) {
      return {
        error: "Tag must be PRODUCT type",
      };
    }

    const assignment = await this.repository.assign(productId, tagId);

    return {
      data: assignment,
    };
  }

  getTags(productId: number) {
    return this.repository.getTags(productId);
  }

  remove(productId: number, tagId: number) {
    return this.repository.remove(productId, tagId);
  }
}
