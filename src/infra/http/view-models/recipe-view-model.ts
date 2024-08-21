import { RecipeEntity } from '@application/entities/recipe.entity';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

export class RecipeViewModel {
  static toHTTP(recipe: RecipeEntity) {
    return {
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      valuePartial: recipe.valuePartial,
      createdAt: recipe.createdAt,
      ingredients: recipe.ingredients,
    };
  }

  static toHTTPGet({ recipe, expenses }: ReturnGetRecipe) {
    return {
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      valuePartial: recipe.valuePartial,
      createdAt: recipe.createdAt,
      ingredients: recipe.ingredients,
      additional: recipe.additional,
      serving: expenses.serving,
      pack: expenses.pack,
      profit: expenses.profit,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    };
  }

  static toHTTPAll({ recipe, expenses }: ReturnGetRecipe) {
    return {
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      valuePartial: recipe.valuePartial,
      serving: expenses.serving,
      pack: expenses.pack,
      profit: expenses.profit,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    };
  }
}
