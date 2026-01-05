import { User, UserParam } from '@jaqua/shared-graphql';

export interface UserReader {
  getUser(params: UserParam): Promise<User>;
  findByLoginKey(loginKey: string): Promise<{
    id: string;
    username: string;
    email?: string;
    roles?: string[];
  } | null>;
}
export const USER_READER = Symbol('USER_READER');
