import { IngredientEntity } from '@application/entities/ingredient.entity';

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
}
