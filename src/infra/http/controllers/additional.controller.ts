import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAdditional } from '@application/use-cases/additional/createAdditional';
import { IngredientDTO as AdditionalDTO } from '../DTOs/ingredient-dto';
import { IngredientUpdatingDTO as AdditionalUpdateDTO } from '../DTOs/ingredient-update';
import { IngredientViewModel } from '../view-models/ingredient-view-model';
import { SaveAdditional } from '@application/use-cases/additional/saveAdditional';
import { DeleteAdditional } from '@application/use-cases/additional/deleteAdditional';

@Controller('additional')
export class AdditionalController {
  constructor(
    private create: CreateAdditional,
    private save: SaveAdditional,
    private deleteA: DeleteAdditional,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async saveAdditional(
    @Param('id') recipeId: string,
    @Res() res: Response,
    @Body() receivedValues: AdditionalUpdateDTO,
  ) {
    try {
      const additional = await this.save.execute(recipeId, receivedValues);

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
        .json({ message: error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:recipeId/:id')
  async deleteAdditional(
    @Param('id') additionalId: string,
    @Param('recipeId') recipeId: string,
    @Res() res: Response,
  ) {
    try {
      await this.deleteA.execute(additionalId, recipeId);

      return res.status(HttpStatus.NO_CONTENT).send();
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
        .json({ message: error });
    }
  }
}
