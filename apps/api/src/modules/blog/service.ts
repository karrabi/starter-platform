import { BlogRepository } from "./repository";
import { CreateBlogDto, UpdateBlogDto } from "./dto";

export class BlogService {
  constructor(private readonly repository = new BlogRepository()) {}

  getAll() {
    return this.repository.findAll();
  }

  getById(id: number) {
    return this.repository.findById(id);
  }

  getPublishedBySlug(slug: string) {
    return this.repository.findPublishedBySlug(slug);
  }

  create(data: CreateBlogDto) {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateBlogDto) {
    return this.repository.update(id, data);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
