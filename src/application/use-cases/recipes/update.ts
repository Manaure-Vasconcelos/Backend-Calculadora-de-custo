import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

interface recipeUpdatingRequest {
  recipeId: string;
  title?: string;
  describe?: string;
}

@Injectable()
export class UpdateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(values: recipeUpdatingRequest): Promise<RecipeEntity> {
    const recipe = new RecipeEntity({
      id: +values.recipeId,
      title: typeof values.title === 'undefined' ? 'Receita' : values.title,
      describe: values.describe,
      userId: 'FakeId',
    });

    const updatedRecipe = await this.recipesRepository.update(recipe);
    return updatedRecipe;
  }
}
