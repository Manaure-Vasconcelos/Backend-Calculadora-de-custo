import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';
import { recipeUpdatingRequest } from 'src/common/interfaces/recipeUpdadeRequest';

@Injectable()
export class UpdateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(
    receivedId: string,
    receivedValues: recipeUpdatingRequest,
  ): Promise<RecipeResponse> {
    const updatedRecipe = await this.recipesRepository.update(
      +receivedId,
      receivedValues,
    );
    return updatedRecipe;
  }
}
