import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';

@Injectable()
export class AllRecipes {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<ReturnGetRecipe[]> {
    const newRecipe =
      await this.recipesRepository.allRecipesFromUser(receivedId);
    return newRecipe;
  }
}
