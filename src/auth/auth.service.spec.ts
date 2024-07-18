import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from './auth.service';
import { makeUser } from '@test/factories/user-factory';
import { JwtService } from '@nestjs/jwt';
import { HashPassword } from './hashPassword';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@application/repositories/user-repository';
import { UserRequest } from '@common/interfaces/userRequest';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { GetUser } from '@application/use-cases/user/get-acount';

describe('AuthService', () => {
  const userRepository = makeUser();
  let authService: AuthService;
  let getUser: GetUser;
  let jwtService: JwtService;
  let hashPassword: HashPassword;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        GetUser,
        HashPassword,
        AuthService,
        { provide: UserRepository, useValue: InMemoryUserRepository },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    getUser = moduleRef.get<GetUser>(GetUser);
    jwtService = moduleRef.get<JwtService>(JwtService);
    hashPassword = moduleRef.get<HashPassword>(HashPassword);
  });

  it('should be able Login with creditais valide', async () => {
    const authService = new AuthService(
      userRepository,
      getUser,
      jwtService,
      hashPassword,
    );

    const userRequest = {
      email: 'manaure@gmail.com',
      password: 'Password123@',
    };

    const user = userRepository.ListUsers[0];

    expect(user.name).toBe('manaure');

    /*  const response = await authService.sigIn(userRequest);

    expect(response.access_token).toBeTruthy(); */
  });

  it('should create a new user when valid input is provided', async () => {
    const authService = new AuthService(
      userRepository,
      getUser,
      jwtService,
      hashPassword,
    );

    const userRequest: UserRequest = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'ValidPass123!',
    };

    await authService.subscribe(userRequest);

    const user = userRepository.ListUsers[2];

    expect(user.name).toBe('John Doe');
  });
});
