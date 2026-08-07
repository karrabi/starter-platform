export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: UserDto;
}
