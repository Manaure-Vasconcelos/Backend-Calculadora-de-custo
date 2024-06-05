import { describe, expect, it } from 'vitest';
import { makeRecipe } from '@test/factories/recipe-factory';
import { RecipesWithIngredients } from './get-with-props';

describe('Create recipe use-case', () => {
  it('should be able creating recipe', async () => {
    const repository = makeRecipe();
    const deleted = new RecipesWithIngredients(repository);

    expect(await deleted.execute('1')).toBeDefined();
  });
});
