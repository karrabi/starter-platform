import { MediaRepository, type CreateMediaDto } from "./repository";

export class MediaService {
  constructor(private readonly repository = new MediaRepository()) {}

  upload(data: CreateMediaDto) {
    return this.repository.create(data);
  }

  getAll() {
    return this.repository.findAll();
  }

  getById(id: number) {
    return this.repository.findById(id);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
