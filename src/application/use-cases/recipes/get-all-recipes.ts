import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class AllRecipes {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(): Promise<RecipeResponse> {
    const newRecipe = await this.recipesRepository.allRecipes();
    return newRecipe;
  }
}
