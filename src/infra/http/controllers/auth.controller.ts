import {
  Body,
  Controller,
  Post,
  ConflictException,
  HttpStatus,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginUserDTO } from '../DTOs/user-dto';
import { RegisterUserDTO } from '../DTOs/register-user-dto';
import { Request, Response } from 'express';
import { parse, serialize } from 'cookie';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() data: LoginUserDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const { access_token, userData } = await this.authService.sigIn(data);

      const cookies = parse(req.headers.cookie || '');

      const tokenExisting = cookies['access_token'];

      if (tokenExisting) {
        const serializeCookie = serialize('access_token', '', {
          maxAge: 0,
          path: '/',
        });

        res.setHeader('Set-Cookie', serializeCookie);
      }

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
        maxAge: 0,
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
        .json({ message: 'Success subscribe' });
    } catch (error: unknown) {
      if (error instanceof ConflictException)
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });

      if (error instanceof BadRequestException)
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed subscribe' });
    }
  }
}
