import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDTO } from './users/user.dto';
import { UsersService } from './users/users.service';

@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() req: any) {
    return await this.authService.signIn(req);
  }

  @Post('register')
  async register(@Body() req: UserDTO) {
    return await this.authService.register(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('user')
  getUsers(@Body() req: any) {
    console.log(req.user);
    return this.userService.findOne(req.name);
  }
}
