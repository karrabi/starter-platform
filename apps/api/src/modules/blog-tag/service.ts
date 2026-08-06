import { TagType } from "@prisma/client";

import { BlogRepository } from "../blog/repository";
import { TagRepository } from "../tag/repository";
import { BlogTagRepository } from "./repository";

export class BlogTagService {
  constructor(
    private readonly repository = new BlogTagRepository(),

    private readonly blogRepository = new BlogRepository(),

    private readonly tagRepository = new TagRepository(),
  ) {}

  async assign(blogId: number, tagId: number) {
    const blog = await this.blogRepository.findById(blogId);

    if (!blog) {
      return {
        error: "Blog not found",
      };
    }

    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      return {
        error: "Tag not found",
      };
    }

    if (tag.type !== TagType.BLOG) {
      return {
        error: "Tag must be BLOG type",
      };
    }

    const assignment = await this.repository.assign(blogId, tagId);

    return {
      data: assignment,
    };
  }

  getTags(blogId: number) {
    return this.repository.getTags(blogId);
  }

  remove(blogId: number, tagId: number) {
    return this.repository.remove(blogId, tagId);
  }
}
