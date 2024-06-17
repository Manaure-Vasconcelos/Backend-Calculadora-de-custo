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

  async execute(values: recipeUpdatingRequest): Promise<void> {
    const current = await this.recipesRepository.getRecipe(values.recipeId);

    if (!current) throw new NotFoundException('Receita não encontrada.');

    const recipe = new RecipeEntity({
      id: values.recipeId,
      title: values.title ?? current.title,
      describe: values.describe ?? current.describe,
      userId: current.userId,
      ingredients: current.ingredients,
      createAt: current.createAt,
    });

    try {
      await this.recipesRepository.update(recipe);
    } catch (error) {
      throw new Error('Não foi possível atualizar');
    }
  }
}
