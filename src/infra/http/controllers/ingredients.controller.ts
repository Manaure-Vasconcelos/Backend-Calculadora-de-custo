import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IngredientDTO } from '../DTOs/ingredient-dto';
import { CreateIngredient } from '@application/use-cases/ingredients/create';
import { GetSingleIngredient } from '@application/use-cases/ingredients/get-single-ingredient';
import { DeleteIngredient } from '@application/use-cases/ingredients/delete-ingredient';
import { SaveIngredient } from '@application/use-cases/ingredients/save';
import { IngredientUpdatingDTO } from '../DTOs/ingredient-update';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller('/ingredients')
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
    @Body() ingredient: IngredientDTO,
  ) {
    await this.createIngredients.execute(recipeId, ingredient);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getIngredient(@Param('id') receivedId: string) {
    const sigleIngredient = await this.getSingleIngredient.execute(receivedId);
    return sigleIngredient;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') receivedId: string) {
    await this.deleteIngredient.execute(receivedId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') receivedId: string,
    @Body() receivedValues: IngredientUpdatingDTO,
  ) {
    await this.saveIngredient.execute(receivedId, receivedValues);
  }
}
