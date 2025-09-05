export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  id: number;
  email: string;
  role: Role;
}

