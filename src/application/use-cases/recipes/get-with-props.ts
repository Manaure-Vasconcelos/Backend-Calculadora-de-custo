import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

@Injectable()
export class RecipesWithIngredients {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.getRecipe(+receivedId);
    return recipe;
  }
}
