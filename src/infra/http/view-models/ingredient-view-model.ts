import { IngredientEntity } from '@application/entities/ingredient.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';

export class IngredientViewModel {
  static toHTTP(recipe: IngredientEntity) {
    return {
      id: recipe.id,
      name: recipe.name,
      usedWeight: recipe.usedWeight,
      marketPrice: recipe.marketPrice,
      grossWeight: recipe.grossWeight,
      realAmount: recipe.grossWeight,
      recipeId: recipe.recipeId,
    };
  }

  static ReturnToHTTP({
    newRecipe: recipe,
    newExpenses: expenses,
  }: ReturnToDomain) {
    return {
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      valuePartial: recipe.valuePartial,
      createdAt: recipe.createdAt,
      ingredients: recipe.ingredients,
      serving: expenses.serving,
      pack: expenses.pack,
      profit: expenses.profit,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    };
  }
}
