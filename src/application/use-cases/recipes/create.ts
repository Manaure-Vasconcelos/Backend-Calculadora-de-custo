import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { RecipeResponse } from 'src/common/interfaces/recipeResponse';

@Injectable()
export class CreateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(
    userId: string,
    receivedValues: RecipeRequest,
  ): Promise<RecipeResponse> {
    const newRecipe = new RecipeEntity({
      userId: userId,
      title: receivedValues.title,
      describe: receivedValues.describe,
    });

    const newRecipe2 = await this.recipesRepository.create(newRecipe);

    return newRecipe2;
  }
}
