import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';

@Injectable()
export class AllRecipes {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<RecipeEntity[]> {
    const newRecipe =
      await this.recipesRepository.allRecipesFromUser(receivedId);
    return newRecipe;
  }
}
