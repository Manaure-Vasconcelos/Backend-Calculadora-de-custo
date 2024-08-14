import { describe, it, expect } from 'vitest';
import { AdditionalEntity } from './additional.entity';

function makeAdditional(): AdditionalEntity {
  return new AdditionalEntity({
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
    const item = makeAdditional();

    expect(item).toBeInstanceOf(AdditionalEntity);
  });

  it('should be able create a new instancy of Additional', () => {
    const additional = makeAdditional();

    const recipe2 = new AdditionalEntity({
      id: additional.id,
      name: additional.name,
      usedWeight: additional.usedWeight,
      marketPrice: additional.marketPrice,
      grossWeight: additional.grossWeight,
      realAmount: additional.realAmount,
      recipeId: additional.recipeId,
    });

    expect(recipe2.id).toBe(-1);
    expect(recipe2.realAmount).toBe(10);
    expect(recipe2.recipeId).toBe(2);
  });

  it('should be able calculate real amount', () => {
    const recipe = new AdditionalEntity({
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
