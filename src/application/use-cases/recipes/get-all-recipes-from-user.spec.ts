import { describe, expect, it } from 'vitest';
import { AllRecipes } from './get-all-recipes-from-user';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';
import { RecipeEntity } from '@application/entities/recipe.entity';

describe('Get All recipe use-case', () => {
  it('should be able return all recipes from user', async () => {
    const allRecipes = new AllRecipes(mockRecipesRepository);

    const result = await allRecipes.execute('1');

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBe(3);
  });

  it('should be able return Instancies RecipeEntity', async () => {
    const allRecipes = new AllRecipes(mockRecipesRepository);

    const result = await allRecipes.execute('1');

    result.forEach((recipe) => {
      expect(recipe).toBeInstanceOf(RecipeEntity);
    });
  });
});
