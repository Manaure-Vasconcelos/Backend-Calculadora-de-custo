import { RecipeEntity } from '@application/entities/recipe.entity';

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
}
