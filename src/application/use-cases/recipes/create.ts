import { RecipeEntity } from '@application/entities/recipe.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

export interface RecipeRequest {
  userId: string;
  title: string;
  describe?: string;
}

@Injectable()
export class CreateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedValues: RecipeRequest): Promise<RecipeEntity> {
    const recipe = new RecipeEntity({
      userId: receivedValues.userId,
      title: receivedValues.title,
      describe: receivedValues.describe,
    });

    if (!recipe) throw new ConflictException();

    const res = await this.recipesRepository.create(recipe);

    if (!res) throw new BadRequestException();

    return res;
  }
}
