import bcrypt from "bcrypt";

import { AppError } from "../../utils/app-error";

import type { CreateUserDto, UpdateUserDto } from "./dto";

import { UserRepository } from "./repository";

export class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  getUsers() {
    return this.repository.findAll();
  }

  async getUserById(id: number) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("A user with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    return this.repository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      roleId: data.roleId,
      isActive: data.isActive,
    });
  }

  async updateUser(id: number, data: UpdateUserDto, currentUserId: number) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (id === currentUserId && data.isActive === false) {
      throw new AppError("You cannot deactivate your own account", 400);
    }

    if (data.email !== undefined && data.email !== user.email) {
      const existingUser = await this.repository.findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
        throw new AppError("A user with this email already exists", 409);
      }
    }

    let passwordHash: string | undefined;

    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 12);
    }

    return this.repository.update(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId,
      isActive: data.isActive,
      ...(passwordHash !== undefined ? { passwordHash } : {}),
    });
  }

  async deleteUser(id: number, currentUserId: number) {
    const user = await this.repository.findById(id);

    if (id === currentUserId) {
      throw new AppError("You cannot delete your own account", 400);
    }

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.repository.delete(id);
  }
}
