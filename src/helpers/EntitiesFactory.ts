import { IngredientEntity } from '@application/entities/ingredient.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';
import { AdditionalEntity } from '@application/entities/additional.entity';
import { AdditionalProps } from '@application/use-cases/additional/createAdditional';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

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

  static deleteIngredient(
    itemId: number,
    recipeId: number,
    returnDb: ReturnGetRecipe,
  ): RecipeEntity {
    returnDb.recipe.ingredients.forEach((item, index) => {
      if (item.id === itemId) {
        returnDb.recipe.ingredients.splice(index, 1);
      }
    });

    return new RecipeEntity({
      id: recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: returnDb.recipe.ingredients,
      additional: returnDb.recipe.additional,
      createdAt: returnDb.recipe.createdAt,
    });
  }

  static createAdditional(
    recipeId: number,
    receivedValues: AdditionalProps,
    ingredientId?: number,
  ): IngredientEntity {
    return new AdditionalEntity({
      id: ingredientId || 0,
      recipeId: recipeId,
      name: receivedValues.name || 'default',
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.usedWeight,
    });
  }

  static deleteAdditional(
    itemId: number,
    recipeId: number,
    returnDb: ReturnGetRecipe,
  ): RecipeEntity {
    returnDb.recipe.additional.forEach((item, index) => {
      if (item.id === itemId) {
        returnDb.recipe.additional.splice(index, 1);
      }
    });

    return new RecipeEntity({
      id: recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: returnDb.recipe.ingredients,
      additional: returnDb.recipe.additional,
      createdAt: returnDb.recipe.createdAt,
    });
  }

  static createRecipeEntity(
    recipeId: number,
    returnDb: ReturnGetRecipe,
    ingredient?: IngredientEntity,
  ): RecipeEntity {
    const res = new RecipeEntity({
      id: recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: ingredient
        ? [...returnDb.recipe.ingredients, ingredient]
        : returnDb.recipe.ingredients,
      additional: returnDb.recipe.additional,
      createdAt: returnDb.recipe.createdAt,
    });

    return res;
  }

  static saveRecipeEntity(
    recipeId: number,
    returnDb: ReturnGetRecipe,
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
      additional: returnDb.recipe.additional,
      createdAt: returnDb.recipe.createdAt,
    });
  }

  static createExpensesEntity(
    recipeId: number,
    returnDb: ReturnGetRecipe,
    valuePartial?: number,
    additional?: AdditionalEntity[],
  ): ExpensesEntity {
    const res = new ExpensesEntity({
      valuePartial: valuePartial ?? returnDb.recipe.valuePartial,
      serving: returnDb.expenses.serving,
      pack: returnDb.expenses.pack,
      profit: returnDb.expenses.profit,
      valueTotal: returnDb.expenses.valueTotal,
      recipeId: recipeId,
    });

    additional?.length !== 0
      ? res.calculateValueUnit(additional)
      : res.calculateValueUnit();

    res.calculateValueTotal();

    return res;
  }
}
