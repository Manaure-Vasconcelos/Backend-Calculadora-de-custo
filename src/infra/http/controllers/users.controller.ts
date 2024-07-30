import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from '@application/use-cases/user/update';
import { UserUpdatingDTO } from '../DTOs/user-update-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetProfile } from '@application/use-cases/user/get-profile';
import { UserViewModel } from '../view-models/user-view-model';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(
    private getProfile: GetProfile,
    private deleteUser: DeleteUser,
    private updateUser: UpdateUser,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUser(@Request() req: any, @Res() res: Response) {
    try {
      const user = await this.getProfile.execute(req.user.id);
      return res.status(HttpStatus.OK).json(UserViewModel.toHTTP(user));
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Not Found user.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req: any, @Res() res: Response) {
    try {
      await this.deleteUser.execute(req.user.id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to delete user.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Request() req: any,
    @Res() res: Response,
    @Body() receivedValues: UserUpdatingDTO,
  ) {
    try {
      await this.updateUser.execute(req.user.id, receivedValues);
      return res.status(HttpStatus.OK).json({ message: 'Updated user.' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to update user.' });
    }
  }
}
