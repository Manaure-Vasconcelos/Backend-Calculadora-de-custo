import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AllRecipes } from 'src/application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from '@application/use-cases/recipes/create';
import { RecipesDTO } from '../DTOs/recipe-dto';
import { RecipesWithIngredients } from '@application/use-cases/recipes/get-with-props';
import { DeleteRecipe } from '@application/use-cases/recipes/delete';
import { UpdateRecipe } from '@application/use-cases/recipes/update';
import { RecipesUpdatingDTO } from '../DTOs/recipe-update-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipeViewModel } from '../view-models/recipe-view-model';

@Controller('recipes')
export class RecipesController {
  constructor(
    private allRecipes: AllRecipes,
    private createRecipe: CreateRecipe,
    private recipeWithIngredients: RecipesWithIngredients,
    private deleteRecipe: DeleteRecipe,
    private updateRecipe: UpdateRecipe,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecipes(
    @Request() req: any,
    @Body() receivedValues: RecipesDTO,
  ): Promise<any> {
    await this.createRecipe.execute({
      userId: req.user.id,
      title: receivedValues.title,
      describe: receivedValues.describe,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllRecipes(@Request() req: any) {
    const allRecipes = await this.allRecipes.execute(req.user.id);
    return allRecipes.map(RecipeViewModel.toHTTP);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getRecipeWithIngredients(
    @Request() req: any,
    @Param('id') recipeId: string,
  ) {
    const recipe = await this.recipeWithIngredients.execute(+recipeId);
    return RecipeViewModel.toHTTP(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') receivedId: string) {
    const deletedRecipe = await this.deleteRecipe.execute(receivedId);
    return deletedRecipe;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') receivedId: string,
    @Body() receivedValues: RecipesUpdatingDTO,
  ) {
    await this.updateRecipe.execute({
      recipeId: +receivedId,
      title: receivedValues.title,
      describe: receivedValues.describe,
    });
  }
}
