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

/* interface SignResponse {
  access_token: string;
  userData: {
    id: string;
    name: string;
    email: string;
  };
} */

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() data: LoginUserDTO, @Res() res: Response) {
    try {
      const { access_token, userData } = await this.authService.sigIn(data);

      return res.status(HttpStatus.OK).json({ access_token, userData });
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
