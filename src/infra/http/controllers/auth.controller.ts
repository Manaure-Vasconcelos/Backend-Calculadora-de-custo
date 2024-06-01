import {
  Body,
  Controller,
  Post,
  HttpException,
  ConflictException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { LoginUserDTO } from '../DTOs/user-dto';
import { RegisterUserDTO } from '../DTOs/register-user-dto';
import { loginResponse } from 'src/common/interfaces/LoginResponse';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() login: LoginUserDTO): Promise<loginResponse> {
    try {
      const token = this.authService.sigIn(login);
      return token;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      )
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  register(@Body() receivedValues: RegisterUserDTO): void {
    try {
      this.authService.subscribe(receivedValues);
    } catch (error) {
      // verificar a msg de erro do service.
      if (error instanceof ConflictException)
        throw new HttpException('Email already exists.', HttpStatus.CONFLICT);

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
