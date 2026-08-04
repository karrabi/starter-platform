import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { AuthRepository } from "./repository";

export class AuthService {
  constructor(private readonly repository = new AuthRepository()) {}

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
