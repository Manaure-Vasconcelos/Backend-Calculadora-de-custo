import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

@Injectable()
export class RecipesWithIngredients {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: number): Promise<ReturnGetRecipe> {
    const recipe = await this.recipeRepository.getRecipeProps(receivedId);
    if (!recipe) throw new NotFoundException('Receita não encontrada.');
    return recipe;
  }
}
