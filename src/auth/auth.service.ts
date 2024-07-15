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
import { HashPassword } from './hashPassword';
import { UserRepository } from '@application/repositories/user-repository';
import { Password } from '@application/entities/user/password';
import { UserEntity } from '@application/entities/user/user.entity';

interface loginResponse {
  access_token: string;
  userData: {
    id: string;
    name: string;
    email: string;
  };
}

interface loginRequest {
  email: string;
  password: string;
}

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private getUser: GetUser,
    private jwtService: JwtService,
    private hashPassword: HashPassword,
  ) {}

  async sigIn({ email, password }: loginRequest): Promise<loginResponse> {
    try {
      const user = await this.getUser.execute(email);

      if (!user) throw new UnauthorizedException('NotFound');

      const isEqualPassword = await this.hashPassword.compare(
        password,
        user.passwordHash,
      );

      if (!isEqualPassword) throw new UnauthorizedException('Invalid Password');

      const { passwordHash, ...userData } = user;

      const payload = {
        sub: userData.id,
      };

      const access_token = await this.jwtService.signAsync(payload);

      return {
        access_token,
        userData,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

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

      await this.userRepository.create(temp);
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException('Email already exists.');

      throw new InternalServerErrorException(
        'Failed to execute user creation.',
      );
    }
  }
}
