import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AllRecipes } from 'src/application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from './../../../application/use-cases/recipes/create-recipe';
import { RecipesDTO } from '../DTOs/recipe-dto';
import { RecipesWithIngredients } from 'src/application/use-cases/recipes/get-recipe-with-ingredients';
import { DeleteRecipe } from 'src/application/use-cases/recipes/delete-recipe';
import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { UpdateRecipe } from 'src/application/use-cases/recipes/update-recipe';

@Controller('recipes')
export class RecipesController {
  constructor(
    private allRecipes: AllRecipes,
    private createRecipe: CreateRecipe,
    private recipeWithIngredients: RecipesWithIngredients,
    private deleteRecipe: DeleteRecipe,
    private updateRecipe: UpdateRecipe,
  ) {}

  @Post() // tenho que receber o password e fazer o tratamento para hash e então setar na db.
  async createRecipes(@Body() receivedValues: RecipesDTO): Promise<any> {
    const recipeCreated = await this.createRecipe.execute(receivedValues);
    return recipeCreated;
    // criar uma receita no usuario logado.
  }

  @Get('/:id') // todas as receitas do usuario logado.
  async getAllRecipes(@Param('id') receivedId: string) {
    const allRecipes = this.allRecipes.execute(receivedId);
    return allRecipes;
  }

  @Get('/with/:id') // criar uma rota mais armonica.
  async getRecipeWithIngredients(@Param('id') receivedId: string) {
    const recipe = this.recipeWithIngredients.execute(receivedId);
    return recipe;
  }

  @Delete('/:id')
  async delete(@Param('id') receivedId: string) {
    const deletedRecipe = await this.deleteRecipe.execute(receivedId);
    return deletedRecipe;
  }

  @Put('/:id')
  async update(
    @Param('id') receivedId: string,
    @Body() receivedValues: RecipeRequest,
  ) {
    const updatedRecipe = await this.updateRecipe.execute(
      receivedId,
      receivedValues,
    );
    return updatedRecipe;
  }
}
