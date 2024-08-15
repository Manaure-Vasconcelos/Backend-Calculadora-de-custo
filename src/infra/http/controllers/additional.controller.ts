import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAdditional } from '@application/use-cases/additional/createAdditional';
import { IngredientDTO as AdditionalDTO } from '../DTOs/ingredient-dto';
import { IngredientViewModel } from '../view-models/ingredient-view-model';

@Controller('additional')
export class AdditionalController {
  constructor(private create: CreateAdditional) {}

  /*  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getAdditional(@Res() res: Response, @Param('id') recipeId: number) {
    try {
      const additional = await this.get.execute(recipeId);

      return res
        .status(HttpStatus.OK)
        .json(IngredientViewModel.toHTTP(additional));
    } catch (error) {
      if (error instanceof NotFoundException)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Additional is empty' });

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'server error' });
    }
  } */

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async createAdditional(
    @Param('id') recipeId: string,
    @Res() res: Response,
    @Body() receivedValues: AdditionalDTO,
  ) {
    try {
      const additional = await this.create.execute(recipeId, receivedValues);

      return res
        .status(HttpStatus.OK)
        .json(IngredientViewModel.ReturnToHTTP(additional));
    } catch (error) {
      if (error instanceof BadRequestException)
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'not created' });

      if (error instanceof NotFoundException)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'not found additional' });

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'server error' });
    }
  }
}
