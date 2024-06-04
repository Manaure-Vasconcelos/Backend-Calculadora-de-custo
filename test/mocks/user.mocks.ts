import { vi } from 'vitest';

export const mockUserRepository = {
  findOne: vi.fn().mockImplementation((criteria: any) => {
    if (criteria.email === 'test@example.com') {
      return Promise.resolve({
        id: 'id',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
    }
    return Promise.resolve(null);
  }),
};

export const mockGetUser = {
  findUserByEmail: vi.fn().mockImplementation((email: string) => {
    if (email === 'test@example.com') {
      return Promise.resolve({
        id: 'id',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
    }
    return Promise.resolve(null);
  }),
};

export const mockJwtService = {
  sign: vi.fn().mockImplementation((payload: any) => 'mockJwtToken'),
  verify: vi.fn().mockImplementation((token: string) => {
    if (token === 'mockJwtToken') {
      return { userId: 1 };
    }
    throw new Error('Invalid token');
  }),
};

export const mockHashPassword = {
  hash: vi.fn().mockImplementation((password: string) => 'hashedPassword'),
  compare: vi.fn().mockImplementation((password: string, hash: string) => {
    if (password === 'password' && hash === 'hashedPassword') {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }),
};
