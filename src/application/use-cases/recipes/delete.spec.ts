import { describe, expect, it } from 'vitest';
import { makeRecipe } from '@test/factories/recipe-factory';
import { DeleteRecipe } from './delete';

describe('Create recipe use-case', () => {
  it('should be able creating recipe', async () => {
    const repository = makeRecipe();
    const deleted = new DeleteRecipe(repository);

    expect(repository.ListRecipes.length).toBe(2);

    await deleted.execute('1');

    expect(repository.ListRecipes.length).toBe(1);
  });
});
