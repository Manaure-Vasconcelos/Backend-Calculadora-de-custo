import { describe, expect, it } from 'vitest';
import { RecipeEntity } from './recipe.entity';

describe('Recipe Entity', () => {
  it('should be able create Recipe', () => {
    const recipe = new RecipeEntity({
      title: 'test',
      userId: 'test',
    });

    expect(recipe).toBeTruthy();
  });

  it('should be able create a new instancy of Recipe', () => {
    const recipe = new RecipeEntity({
      title: 'test',
      userId: 'test',
    });

    const recipe2 = new RecipeEntity({
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      userId: recipe.userId,
      createAt: recipe.createAt,
      valuePartial: recipe.valuePartial,
    });

    expect(recipe2.id).toBe(0);
  });
});
