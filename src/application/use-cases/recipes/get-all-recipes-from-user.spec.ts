import { describe, expect, it } from 'vitest';
import { makeRecipe } from '@test/factories/recipe-factory';
import { AllRecipes } from './get-all-recipes-from-user';

describe('Create recipe use-case', () => {
  it('should be able creating recipe', async () => {
    const repository = makeRecipe();
    const deleted = new AllRecipes(repository);

    expect(await deleted.execute('1')).toBeDefined();
  });
});
