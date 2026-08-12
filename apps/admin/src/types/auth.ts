export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: UserDto;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface CurrentUser {
  userId: number;
  email: string;
  role: string;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
}
