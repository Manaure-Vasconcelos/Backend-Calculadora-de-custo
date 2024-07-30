import {
  Body,
  Controller,
  Post,
  ConflictException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginUserDTO } from '../DTOs/user-dto';
import { RegisterUserDTO } from '../DTOs/register-user-dto';
import { Response } from 'express';
import { serialize } from 'cookie';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: LoginUserDTO, @Res() res: Response) {
    try {
      const { access_token, userData } = await this.authService.sigIn(data);

      const serializeCookie = serialize('access_token', access_token, {
        httpOnly: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      res.setHeader('Set-Cookie', serializeCookie);

      return res.status(HttpStatus.OK).json({ userData });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized.' });
    }
  }

  @Post('signout')
  async signOut(@Res() res: Response) {
    try {
      const serializeCookie = serialize('access_token', '', {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        path: '/',
      });

      res.setHeader('Set-Cookie', serializeCookie);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged out successfully.' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to log out.' });
    }
  }

  @Post('register')
  async register(
    @Body() receivedValues: RegisterUserDTO,
    @Res() res: Response,
  ) {
    try {
      await this.authService.subscribe(receivedValues);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Sucess subscribe' });
    } catch (error) {
      // verificar a msg de erro do service.
      if (error instanceof ConflictException)
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Email existing' });

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed subscribe' });
    }
  }
}
