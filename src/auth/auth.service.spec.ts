import { GetUser } from '@application/use-cases/user/get-acount';
import { describe, it, expect, vi } from 'vitest';
import { AuthService } from './auth.service';
import { makeUser } from '@test/factories/user-factory';
import { JwtService } from '@nestjs/jwt';

import { LoggerService } from '@nestjs/common';

class MockJwtService implements JwtService {
  // Propriedades adicionais necessárias pelo JwtService
  secret options: any;
  logger: LoggerService;

  // Métodos do JwtService
  sign = vi.fn();
  signAsync = vi.fn();
  verify = vi.fn();
  verifyAsync = vi.fn();
  decode = vi.fn();

  // Métodos adicionais necessários pelo JwtService
  mergeJwtOptions = vi.fn();
  overrideSecretFromOptions = vi.fn();
  getSecretKey = vi.fn();

  // Construtor opcional para inicializar propriedades, se necessário
  constructor(options?: any, logger?: LoggerService) {
    this.options = options || {};
    this.logger = logger || (console as unknown as LoggerService);
  }
}

describe('AuthService', () => {
  // successful sign-in with valid credentials returns access token
  it('should return access token when sign-in with valid credentials', async () => {
    const mockUserRepository = makeUser();
    const mockGetUser = new GetUser(mockUserRepository);
    const mockJwtService: Partial<JwtService> = new MockJwtService();
    const mockHashPassword = {
      compare: vi.fn().mockResolvedValue(true),
    };
    const authService = new AuthService(
      mockUserRepository,
      mockGetUser,
      mockJwtService,
      mockHashPassword,
    );

    const response = await authService.sigIn({
      email: 'example@example.com',
      password: 'password123',
    });

    expect(response).toEqual({ access_token: 'access_token' });
  });
});
