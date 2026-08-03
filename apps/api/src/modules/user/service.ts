import { UserRepository } from "./repository";

export class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  getUsers() {
    return this.repository.findAll();
  }
}