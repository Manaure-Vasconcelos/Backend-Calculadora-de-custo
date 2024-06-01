import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from '@application/use-cases/user/update';
import { UserUpdatingDTO } from '../DTOs/user-update-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserWithProps } from '@application/use-cases/user/get-profile';

@Controller('user')
export class UsersController {
  constructor(
    private getUserWithProps: GetUserWithProps,
    private deleteUser: DeleteUser,
    private updateUser: UpdateUser,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUser(@Request() req: any) {
    try {
      const user = this.getUserWithProps.execute(req.user.id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req: any) {
    try {
      await this.deleteUser.execute(req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req: any, @Body() receivedValues: UserUpdatingDTO) {
    try {
      const updateUser = await this.updateUser.execute({
        id: req.user.id,
        name: receivedValues.name,
        email: receivedValues.email,
        password: receivedValues.password,
      });
      return updateUser;
    } catch (error) {
      throw new HttpException(
        'Error updating',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
