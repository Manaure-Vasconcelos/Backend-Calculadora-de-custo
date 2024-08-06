import { IngredientEntity } from '@application/entities/ingredient.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';

export class EntityFactory {
  static createIngredientEntity(
    recipeId: number,
    receivedValues: any,
  ): IngredientEntity {
    return new IngredientEntity({
      recipeId: recipeId,
      name: receivedValues.name || 'default',
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.usedWeight,
    });
  }

  static createRecipeEntity(
    recipeId: number,
    returnDb: any,
    ingredient: IngredientEntity,
  ): RecipeEntity {
    return new RecipeEntity({
      id: recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: [...returnDb.recipe.ingredients, ingredient],
      createdAt: returnDb.recipe.createdAt,
    });
  }

  static createExpensesEntity(recipeId: number, returnDb: any): ExpensesEntity {
    return new ExpensesEntity({
      valuePartial: returnDb.recipe.valuePartial ?? 0,
      serving: returnDb.expenses.serving,
      pack: returnDb.expenses.pack,
      profit: returnDb.expenses.profit,
      valueTotal: returnDb.expenses.valueTotal,
      valueUnit: returnDb.expenses.valueUnit,
      recipeId: recipeId,
    });
  }
}
