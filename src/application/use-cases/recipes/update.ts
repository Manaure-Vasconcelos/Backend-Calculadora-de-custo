import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

interface recipeUpdatingRequest {
  recipeId: number;
  title?: string;
  describe?: string;
}

@Injectable()
export class UpdateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(values: recipeUpdatingRequest): Promise<RecipeEntity> {
    const returnDb = await this.recipesRepository.getRecipeProps(
      values.recipeId,
    );

    if (!returnDb) throw new NotFoundException('Receita não encontrada.');

    const newRecipe = new RecipeEntity({
      id: values.recipeId,
      title: values.title ?? returnDb.recipe.title,
      describe: values.describe ?? returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: returnDb.recipe.ingredients,
      createdAt: returnDb.recipe.createdAt,
    });

    try {
      const res = await this.recipesRepository.update(newRecipe);
      return res;
    } catch (error) {
      throw new Error('Não foi possível atualizar');
    }
  }
}
