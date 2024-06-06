import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { ServiceRecipeMapper } from '../mappers/recipe-mapper';

export interface RecipeRequest {
  userId: string;
  title: string;
  describe?: string;
}

@Injectable()
export class CreateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedValues: RecipeRequest): Promise<RecipeEntity> {
    const recipe = ServiceRecipeMapper.toEntity(receivedValues);

    return await this.recipesRepository.create(recipe);
  }
}
