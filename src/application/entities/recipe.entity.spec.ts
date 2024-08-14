import { describe, expect, it } from 'vitest';
import { RecipeEntity } from './recipe.entity';
import { AdditionalEntity } from './additional.entity';

function makeRecipe() {
  return new RecipeEntity({
    title: 'test',
    userId: 'test',
  });
}

function makeAdditional() {
  return new AdditionalEntity({
    name: 'item 1',
    usedWeight: 2,
    marketPrice: 10,
    grossWeight: 5,
    realAmount: 10,
    recipeId: 2,
  });
}

describe('Recipe Entity', () => {
  it('should be able create Recipe', () => {
    const recipe = makeRecipe();

    expect(recipe).toBeInstanceOf(RecipeEntity);
    expect(recipe.additional).toBeDefined();
    expect(recipe.ingredients).toBeDefined();
    expect(recipe.valuePartial).toBe(0);
  });

  it('should be able create Recipe with additional', () => {
    const additional = makeAdditional();
    const recipe = new RecipeEntity({
      title: 'test',
      userId: 'test',
      additional: [additional, additional],
    });

    expect(recipe.additional).toHaveLength(2);
  });

  it('should be able create a new instancy of Recipe', () => {
    const recipe = makeRecipe();

    const recipe2 = new RecipeEntity({
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      userId: recipe.userId,
      createdAt: recipe.createdAt,
      valuePartial: recipe.valuePartial,
    });

    expect(recipe2.id).toBe(undefined);
    expect(recipe2.title).toBe('test');
    expect(recipe2.userId).toBe('test');
  });
});
