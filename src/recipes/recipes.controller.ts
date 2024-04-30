import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post() // tenho que receber o password e fazer o tratamento para hash e então setar na db.
  async createRecipe(@Body() dataRecipe: any): Promise<any> {
    const recipeCreated = await this.recipesService.createRecipe(dataRecipe);
    return recipeCreated;
  }

  @Get()
  async getAllRecipes() {
    const allRecipes = this.recipesService.getAllRecipes();
    return allRecipes;
  }

  @Get('/:id')
  async getRecipe(@Param('id') idRecipe: string) {
    const recipe = this.recipesService.getRecipe(+idRecipe);
    return recipe;
  }

  @Delete('/:id')
  async deleteRecipe(@Param('id') idRecipe: any) {
    const deletedRecipe = await this.recipesService.deleteRecipe(+idRecipe);
    return deletedRecipe;
  }

  @Put('/:id')
  async updateRecipe(
    @Param('id') idRecipe: string,
    @Body() dataRecipe: string,
  ) {
    const updatedRecipe = await this.recipesService.updateRecipe(
      +idRecipe,
      dataRecipe,
    );
    return updatedRecipe;
  }
}
