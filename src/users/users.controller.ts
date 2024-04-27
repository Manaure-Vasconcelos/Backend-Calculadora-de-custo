import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    const allUsers = this.usersService.getAllUsers();
    return allUsers;
  }

  @Post() // tenho que receber o password e fazer o tratamento para hash e então setar na db.
  async createUsers(@Body() user: any): Promise<any> {
    const userCreated = await this.usersService.createUser(user);
    return userCreated;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: any) {
    const deleteUser = await this.usersService.deleteUser(parseFloat(id));
    return deleteUser;
  }
}
