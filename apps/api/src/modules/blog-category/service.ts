import { CategoryType } from "@prisma/client";

import { BlogCategoryRepository } from "./repository";
import { CategoryRepository } from "../category/repository";
import { BlogRepository } from "../blog/repository";

export class BlogCategoryService {
  constructor(
    private readonly repository = new BlogCategoryRepository(),

    private readonly blogRepository = new BlogRepository(),

    private readonly categoryRepository = new CategoryRepository(),
  ) {}

  async assign(blogId: number, categoryId: number) {
    const blog = await this.blogRepository.findById(blogId);

    if (!blog) {
      return null;
    }

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      return null;
    }

    if (category.type !== CategoryType.BLOG) {
      throw new Error("Category must be BLOG type");
    }

    return this.repository.add(blogId, categoryId);
  }

  getCategories(blogId: number) {
    return this.repository.getCategories(blogId);
  }

  remove(blogId: number, categoryId: number) {
    return this.repository.remove(blogId, categoryId);
  }
}
