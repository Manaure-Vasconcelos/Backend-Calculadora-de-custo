import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/application/use-cases/user/get-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { UserUpdatingDTO } from '../DTOs/user-update-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private getUser: GetUser,
    private deleteUser: DeleteUser,
    private updateUser: UpdateUser,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('with-recipe')
  async post(@Request() req: any) {
    const user = this.getUser.execute(req.user.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Request() req: any) {
    const deleteUser = await this.deleteUser.execute(req.id);
    return deleteUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Request() req: any, @Body() receivedValues: UserUpdatingDTO) {
    const updateUser = await this.updateUser.execute(
      req.user.id,
      receivedValues,
    );
    return updateUser;
  }
}
