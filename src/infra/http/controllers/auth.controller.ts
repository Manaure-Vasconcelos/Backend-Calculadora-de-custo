import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { UserDTO } from '../DTOs/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() login: UserDTO) {
    try {
      const token = this.authService.sigIn(login);
      return token;
    } catch (error) {
      // verificar a msg de erro do service.
      if (error.message === 'Invalid credentials') {
        throw new HttpException('Unauthorized', 401);
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Post('register')
  register(@Body() receivedValues: UserDTO) {
    try {
      const user = this.authService.register(receivedValues);
      return user;
    } catch (error) {
      // verificar a msg de erro do service.
      if (error.message === 'User already exists') {
        throw new HttpException('Conflict', 409);
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
