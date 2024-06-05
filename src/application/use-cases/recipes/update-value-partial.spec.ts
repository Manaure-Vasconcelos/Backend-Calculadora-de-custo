import { describe, expect, it } from 'vitest';
import { makeRecipe } from '@test/factories/recipe-factory';
import { UpdatingValuePartial } from './update-value-partial';

describe('Updating value partial recipe use-case', () => {
  it('should be able updating value recipe', async () => {
    const repository = makeRecipe();
    const updateValue = new UpdatingValuePartial(repository);
    const recipe = repository.ListRecipes[0];

    await updateValue.execute(1);

    expect(recipe.valuePartial).toBe(10);

    recipe.valuePartial = 20;

    expect(recipe.valuePartial).toBe(20);
  });
});
