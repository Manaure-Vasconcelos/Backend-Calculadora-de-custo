import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

@Injectable()
export class RecipesWithIngredients {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: number): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.getRecipe(receivedId);
    if (!recipe) throw new NotFoundException('Receita não encontrada.');
    return recipe;
  }
}
