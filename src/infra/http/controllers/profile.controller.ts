import { GetProfile } from '@application/use-cases/profile/get-profile';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ProfileViewModel } from '../view-models/profile-view-model';
import { SaveProfile } from '@application/use-cases/profile/save';
import { ProfileUpdatingDTO } from '../DTOs/profile-update-dto';

@Controller('/profile')
export class ProfileController {
  constructor(
    private getProfile: GetProfile,
    private saveProfile: SaveProfile,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserProfile(@Request() req: any, @Res() res: Response) {
    try {
      const profile = await this.getProfile.execute(req.user.id);
      return res.status(HttpStatus.OK).json(ProfileViewModel.toHTTP(profile));
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed return Profile', error: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchProfile(
    @Request() req: any,
    @Res() res: Response,
    @Body() receivedValues: ProfileUpdatingDTO,
  ) {
    try {
      const newProfile = await this.saveProfile.execute(
        req.user.id,
        receivedValues,
      );
      return res
        .status(HttpStatus.OK)
        .json(ProfileViewModel.toHTTP(newProfile));
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed return recipes', error: error.message });
    }
  }
}
