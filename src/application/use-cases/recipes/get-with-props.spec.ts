import { describe, expect, it } from 'vitest';
import { RecipesWithIngredients } from './get-with-props';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';
import { RecipeEntity } from '@application/entities/recipe.entity';

describe('Get recipe with props use-case', () => {
  it('should be able getting recipe with props', async () => {
    const getRecipe = new RecipesWithIngredients(mockRecipesRepository);

    const result = await getRecipe.execute('1');

    expect(result).toBeInstanceOf(RecipeEntity);
    expect(result.ingredients.length).toBe(3);
  });
});
