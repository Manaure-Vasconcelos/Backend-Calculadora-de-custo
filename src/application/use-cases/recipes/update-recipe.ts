import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class UpdateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(
    receivedId: string,
    receivedValues: RecipeRequest,
  ): Promise<RecipeResponse> {
    const updatedRecipe = await this.recipesRepository.update(
      +receivedId,
      receivedValues,
    );
    return updatedRecipe;
  }
}
