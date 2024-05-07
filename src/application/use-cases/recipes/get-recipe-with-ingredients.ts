import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class RecipesWithIngredients {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<RecipeResponse> {
    const recipe = await this.recipeRepository.getRecipe(+receivedId);
    return recipe;
  }
}
