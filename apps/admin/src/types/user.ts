export type Role = {
  id: number;
  name: string;
  description: string | null;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roleId: number | null;
  role: Role | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId?: number | null;
  isActive?: boolean;
};

export type UpdateUserRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleId?: number | null;
  isActive?: boolean;
};
