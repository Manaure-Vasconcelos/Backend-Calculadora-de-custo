/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GetUser } from '../application/use-cases/user/get-acount';
import { JwtService } from '@nestjs/jwt';
import { loginResponse } from 'src/common/interfaces/LoginResponse';
import { HashPassword } from './hashPassword';
import { UserRequest } from '@common/interfaces/userRequest';
import { UserRepository } from '@application/repositories/user-repository';
import { Password } from '@application/entities/user/password';
import { UserEntity } from '@application/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private getUser: GetUser,
    private jwtService: JwtService,
    private hashPassword: HashPassword,
  ) {}

  async sigIn({ email, password }): Promise<loginResponse> {
    try {
      const user = await this.getUser.execute(email);

      if (!user) throw new UnauthorizedException('NotFound');

      const isEqualPassword = await this.hashPassword.compare(
        password,
        user.passwordHash,
      );

      if (!isEqualPassword) throw new UnauthorizedException('Invalid Password');

      const { passwordHash, ...result } = user;

      const payload = {
        sub: result.id,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      )
        throw error;

      throw new InternalServerErrorException();
    }
  }

  async subscribe(user: UserRequest): Promise<void> {
    try {
      const { password } = user;

      const pass = new Password(password);

      const temp = new UserEntity({
        name: user.name,
        email: user.email,
        password: pass,
      });

      this.userRepository.create(temp);
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException('Email already exists.');

      throw new InternalServerErrorException(
        'Failed to execute user creation.',
      );
    }
  }
}
