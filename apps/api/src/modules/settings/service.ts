import { SettingsRepository } from "./repository";

export class SettingsService {
  constructor(private readonly repository = new SettingsRepository()) {}

  getGroup(key: string) {
    return this.repository.getGroup(key);
  }

  updateGroup(key: string, value: unknown) {
    return this.repository.updateGroup(key, value);
  }
}
