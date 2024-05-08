import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class CreateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedValues: RecipeRequest): Promise<RecipeResponse> {
    const newRecipe = await this.recipesRepository.create(receivedValues);
    return newRecipe;
  }
}
