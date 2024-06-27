import { describe, expect, it } from 'vitest';
import { RecipeEntity } from './recipe.entity';

describe('Recipe Entity', () => {
  it('should be able create Recipe', () => {
    const recipe = new RecipeEntity({
      title: 'test',
      userId: 'test',
    });

    expect(recipe).toBeInstanceOf(RecipeEntity);
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
      createdAt: recipe.createAt,
      valuePartial: recipe.valuePartial,
    });

    expect(recipe2.id).toBe(undefined);
    expect(recipe2.title).toBe('test');
    expect(recipe2.userId).toBe('test');
  });
});
