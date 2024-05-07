import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class DeleteRecipe {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<RecipeResponse> {
    const deletedRecipe = await this.recipeRepository.delete(+receivedId);
    return deletedRecipe;
  }
}
