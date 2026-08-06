import { CategoryType } from "@prisma/client";

import { ProductRepository } from "../product/repository";
import { CategoryRepository } from "../category/repository";
import { ProductCategoryRepository } from "./repository";

export class ProductCategoryService {
  constructor(
    private readonly repository =
      new ProductCategoryRepository(),

    private readonly productRepository =
      new ProductRepository(),

    private readonly categoryRepository =
      new CategoryRepository()
  ) {}

  async assign(
    productId: number,
    categoryId: number
  ) {
    const product =
      await this.productRepository.findById(productId);

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    const category =
      await this.categoryRepository.findById(categoryId);

    if (!category) {
      return {
        error: "Category not found",
      };
    }

    if (category.type !== CategoryType.PRODUCT) {
      return {
        error: "Category must be PRODUCT type",
      };
    }

    const assignment =
      await this.repository.assign(
        productId,
        categoryId
      );

    return {
      data: assignment,
    };
  }

  getCategories(productId: number) {
    return this.repository.getCategories(productId);
  }

  remove(
    productId: number,
    categoryId: number
  ) {
    return this.repository.remove(
      productId,
      categoryId
    );
  }
}