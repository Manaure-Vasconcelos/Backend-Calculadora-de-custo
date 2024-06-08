import { describe, it, expect } from 'vitest';
import { IngredientEntity } from './ingredient.entity';

function makeIngredient(): IngredientEntity {
  return new IngredientEntity({
    name: 'item 1',
    usedWeight: 2,
    marketPrice: 10,
    grossWeight: 5,
    realAmount: 10,
    recipeId: 2,
  });
}

describe('Ingredient Entity', () => {
  it('should be able create Entity', () => {
    const item = makeIngredient();

    expect(item).toBeInstanceOf(IngredientEntity);
  });

  it('should be able create a new instancy of Recipe', () => {
    const recipe = makeIngredient();

    const recipe2 = new IngredientEntity({
      id: recipe.id,
      name: recipe.name,
      usedWeight: recipe.usedWeight,
      marketPrice: recipe.marketPrice,
      grossWeight: recipe.grossWeight,
      realAmount: recipe.realAmount,
      recipeId: recipe.recipeId,
    });

    expect(recipe2.id).toBe(-1);
    expect(recipe2.realAmount).toBe(10);
    expect(recipe2.recipeId).toBe(2);
  });

  it('should be able calculate real amount', () => {
    const recipe = new IngredientEntity({
      name: 'item 1',
      usedWeight: 2,
      marketPrice: 10,
      grossWeight: 5,
      recipeId: 2,
    });

    expect(recipe.realAmount).toBeDefined();
    expect(recipe.realAmount).toBe(4);
  });
});
