import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from '../DTOs/user-dto';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { GetUser } from 'src/application/use-cases/user/get-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { UserUpdatingDTO } from '../DTOs/user-update-dto';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private getUser: GetUser,
    private deleteUser: DeleteUser,
    private updateUser: UpdateUser,
  ) {}

  @Post() // tenho que receber o password e fazer o tratamento para hash e então setar na db.
  async create(@Body() user: UserDTO): Promise<any> {
    const userCreated = await this.createUser.execute(user);
    return userCreated;
  }

  @Get('/:id')
  async get(@Param('id') idUser: string) {
    const user = this.getUser.execute(+idUser);
    return user;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deleteUser = await this.deleteUser.execute(id);
    return deleteUser;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() receivedValues: UserUpdatingDTO,
  ) {
    const updateUser = await this.updateUser.execute(id, receivedValues);
    return updateUser;
  }
}
