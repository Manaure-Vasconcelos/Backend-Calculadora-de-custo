import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from '../application/use-cases/user/create-user';
import { GetUser } from '../application/use-cases/user/get-user';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from 'src/infra/http/DTOs/user-dto';
import { loginResponse } from 'src/common/interfaces/LoginResponse';
import { HashPassword } from './hashPassword';
import { UserResponse } from 'src/common/interfaces/userResponse';
import { observeNotification } from 'rxjs/internal/Notification';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private createUser: CreateUser,
    private getUser: GetUser,
    private jwtService: JwtService,
    private hashPassword: HashPassword,
  ) {}

  async sigIn({ email, password }): Promise<loginResponse> {
    try {
      const user = await this.getUser.execute(email);

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

  async register(user: LoginUserDTO): Promise<UserResponse> {
    try {
      const { password, ...result } = user;

      const passwordHash = this.hashPassword.create(password);

      const userCreated = await this.createUser.execute({
        ...result,
        passwordHash: passwordHash,
      });
      return userCreated;
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException('Email already exists.');

      throw new InternalServerErrorException(
        'Failed to execute user creation.',
      );
    }
  }
}
