import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userDTO } from './DTO/user-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post() // tenho que receber o password e fazer o tratamento para hash e então setar na db.
  async createUsers(@Body() user: userDTO): Promise<userDTO> {
    const userCreated = await this.usersService.createUser(user);
    return userCreated;
  }

  @Get()
  async getAllUsers() {
    const allUsers = this.usersService.getAllUsers();
    return allUsers;
  }

  @Get('/:id')
  async getUser(@Param('id') idUser: string) {
    const user = this.usersService.getUser(+idUser);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deleteUser = await this.usersService.deleteUser(+id);
    return deleteUser;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: string) {
    const updateUser = await this.usersService.updateUser(+id, user);
    return updateUser;
  }
}
