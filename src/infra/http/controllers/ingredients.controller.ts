import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IngredientDTO } from '../DTOs/ingredient-dto';
import { CreateIngredient } from '@application/use-cases/ingredients/create';
import { GetSingleIngredient } from '@application/use-cases/ingredients/get-single-ingredient';
import { DeleteIngredient } from '@application/use-cases/ingredients/delete-ingredient';
import { SaveIngredient } from '@application/use-cases/ingredients/save';
import { IngredientUpdatingDTO } from '../DTOs/ingredient-update';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { Response } from 'express';
import { IngredientViewModel } from '../view-models/ingredient-view-model';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    private createIngredients: CreateIngredient,
    private getSingleIngredient: GetSingleIngredient,
    private deleteIngredient: DeleteIngredient,
    private saveIngredient: SaveIngredient,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async create(
    @Param('id') recipeId: string,
    @Res() res: Response,
    @Body() ingredient: IngredientDTO,
  ) {
    try {
      const ingredientCreated = await this.createIngredients.execute(
        recipeId,
        ingredient,
      );
      return res
        .status(HttpStatus.CREATED)
        .json(IngredientViewModel.ReturnToHTTP(ingredientCreated));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to create ingredient.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') receivedId: string,
    @Body() receivedValues: IngredientUpdatingDTO,
  ) {
    try {
      const ingredient = await this.saveIngredient.execute(
        receivedId,
        receivedValues,
      );
      return res
        .status(HttpStatus.OK)
        .json(IngredientViewModel.ReturnToHTTP(ingredient));
    } catch (error: any) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getIngredient(@Param('id') receivedId: string, @Res() res: Response) {
    try {
      const sigleIngredient =
        await this.getSingleIngredient.execute(receivedId);
      return res.status(HttpStatus.OK).json(sigleIngredient);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Not Found ingredient.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:recipeId/:id')
  async delete(
    @Param('id') itemId: string,
    @Param('recipeId') recipeId: string,
    @Res() res: Response,
  ) {
    try {
      await this.deleteIngredient.execute(recipeId, itemId);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Failed to delete ingredient.' });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error server.' });
    }
  }
}
