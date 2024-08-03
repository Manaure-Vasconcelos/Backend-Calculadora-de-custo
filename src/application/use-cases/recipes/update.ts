import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { ExpensesEntity } from '@application/entities/expenses.entity';

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

    const newExpenses = new ExpensesEntity({
      valuePartial: returnDb.recipe.valuePartial ?? 0,
      serving: returnDb.expenses.serving,
      pack: returnDb.expenses.pack,
      profit: returnDb.expenses.profit,
      valueTotal: returnDb.expenses.valueTotal,
      valueUnit: returnDb.expenses.valueUnit,
      recipeId: 46,
    });

    newExpenses.calculateValueTotal();

    console.log(newRecipe);
    console.log(newExpenses);

    try {
      const res = await this.recipesRepository.update(newRecipe);
      return res;
    } catch (error) {
      throw new Error('Não foi possível atualizar');
    }
  }
}
