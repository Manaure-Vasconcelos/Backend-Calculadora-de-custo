import { IngredientEntity } from '@application/entities/ingredient.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';

export class EntityFactory {
  static createIngredientEntity(
    recipeId: number,
    receivedValues: any,
    ingredientId?: number,
  ): IngredientEntity {
    return new IngredientEntity({
      id: ingredientId || 0,
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

  static saveRecipeEntity(
    recipeId: number,
    returnDb: any,
    ingredient: IngredientEntity,
  ): RecipeEntity {
    returnDb.recipe.ingredients.forEach((item, index) => {
      if (item.id === ingredient.id) {
        returnDb.recipe.ingredients[index] = {
          id: ingredient.id,
          name: ingredient.name,
          usedWeight: ingredient.usedWeight,
          marketPrice: ingredient.marketPrice,
          grossWeight: ingredient.grossWeight,
          realAmount: ingredient.realAmount,
          recipeId: ingredient.recipeId,
        };
      }
    });

    return new RecipeEntity({
      id: recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: returnDb.recipe.ingredients,
      createdAt: returnDb.recipe.createdAt,
    });
  }

  static createExpensesEntity(
    recipeId: number,
    returnDb: any,
    valuePartial?: number,
  ): ExpensesEntity {
    return new ExpensesEntity({
      valuePartial: valuePartial || returnDb.recipe.valuePartial,
      serving: returnDb.expenses.serving,
      pack: returnDb.expenses.pack,
      profit: returnDb.expenses.profit,
      valueTotal: returnDb.expenses.valueTotal,
      valueUnit: returnDb.expenses.valueUnit,
      recipeId: recipeId,
    });
  }
}
