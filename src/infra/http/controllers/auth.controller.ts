import {
  Body,
  Controller,
  Post,
  ConflictException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { LoginUserDTO } from '../DTOs/user-dto';
import { RegisterUserDTO } from '../DTOs/register-user-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() login: LoginUserDTO, @Res() res: Response) {
    try {
      const token = await this.authService.sigIn(login);
      return res.status(HttpStatus.OK).json(token);
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized.' });
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
