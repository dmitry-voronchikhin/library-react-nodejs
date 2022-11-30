export enum Role {
  ADMIN = 'admin',
  READER = 'reader',
}

export type User = {
  id: string;
  email: string;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;
} & TokensResponse;

export type ErrorResponse = {
  error: {
    message: string;
  };
};
