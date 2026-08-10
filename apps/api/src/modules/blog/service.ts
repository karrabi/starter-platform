import { BlogRepository } from "./repository";
import { CreateBlogDto, UpdateBlogDto } from "./dto";

export class BlogService {
  constructor(private readonly repository = new BlogRepository()) {}

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

  create(data: CreateBlogDto) {
    return this.repository.create({
      ...data,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    });
  }

  async update(id: number, data: UpdateBlogDto) {
    const blog = await this.repository.findById(id);

    if (!blog) {
      return null;
    }

    let publishedAt = blog.publishedAt;

    if (data.status === "PUBLISHED" && blog.status !== "PUBLISHED") {
      publishedAt = new Date();
    }

    if (data.status === "DRAFT") {
      publishedAt = null;
    }

    return this.repository.update(id, {
      ...data,
      publishedAt,
    });
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
