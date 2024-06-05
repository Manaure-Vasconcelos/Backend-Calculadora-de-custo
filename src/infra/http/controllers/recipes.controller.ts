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
import { CreateRecipe } from '../../../application/use-cases/recipes/create';
import { RecipesDTO } from '../DTOs/recipe-dto';
import { RecipesWithIngredients } from 'src/application/use-cases/recipes/get-recipe-with-ingredients';
import { DeleteRecipe } from '@application/use-cases/recipes/delete';
import { UpdateRecipe } from 'src/application/use-cases/recipes/update-recipe';
import { RecipesUpdatingDTO } from '../DTOs/recipe-update-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    const recipeCreated = await this.createRecipe.execute(
      req.user.id,
      receivedValues,
    );
    return recipeCreated;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllRecipes(@Request() req: any) {
    const allRecipes = this.allRecipes.execute(req.user.id);
    return allRecipes;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getRecipeWithIngredients(
    @Request() req: any,
    @Param('id') recipeId: string,
  ) {
    const recipe = this.recipeWithIngredients.execute(recipeId);
    return recipe;
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
    const updatedRecipe = await this.updateRecipe.execute(
      receivedId,
      receivedValues,
    );
    return updatedRecipe;
  }
}
