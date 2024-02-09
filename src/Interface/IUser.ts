export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  password: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserResponse {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  userName?: string;
  token?: string;
}

export interface TokenData {
  id: number;
  userName: string;
}
