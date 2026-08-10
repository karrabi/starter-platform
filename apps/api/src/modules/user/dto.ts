export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: number | null;
  isActive?: boolean;
};

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleId?: number | null;
  isActive?: boolean;
};
