import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { UserDTO } from '../DTOs/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() login: UserDTO) {
    return this.authService.sigIn(login);
  }

  @Post('register')
  register(@Body() receivedValues: UserDTO) {
    return this.authService.register(receivedValues);
  }
}
