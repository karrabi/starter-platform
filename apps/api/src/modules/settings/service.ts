import { SettingsRepository } from "./repository";

export class SettingsService {
  constructor(private readonly repository = new SettingsRepository()) {}

  getAll() {
    return this.repository.getAll();
  }

  update(key: string, value: string) {
    return this.repository.set(key, value);
  }
}
