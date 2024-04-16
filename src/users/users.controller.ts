import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users-dto';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe()) // maneira local de validação. importar em toda validação, mt custoso.
  createUser(@Body() user: UsersDto) {
    this.userService.createUser(user);
  }
}
