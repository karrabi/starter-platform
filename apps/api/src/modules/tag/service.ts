import type { TagType } from "@prisma/client";

import type { CreateTagDto, UpdateTagDto } from "./dto";
import { TagRepository } from "./repository";

export class TagService {
  constructor(private readonly repository = new TagRepository()) {}

  getAll() {
    return this.repository.findAll();
  }

  getByType(type: TagType) {
    return this.repository.findByType(type);
  }

  create(data: CreateTagDto) {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateTagDto) {
    const tag = await this.repository.findById(id);

    if (!tag) {
      return null;
    }

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const tag = await this.repository.findById(id);

    if (!tag) {
      return null;
    }

    return this.repository.delete(id);
  }
}
