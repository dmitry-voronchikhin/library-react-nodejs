export enum Role {
  ADMIN = 'admin',
  READER = 'reader',
}

export type User = {
  id: string;
  email: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type ErrorResponse = {
  error: {
    message: string;
  };
};
