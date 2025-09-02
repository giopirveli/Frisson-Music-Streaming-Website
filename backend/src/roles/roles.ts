export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  id: string;
  email: string;
  role: Role;
}

