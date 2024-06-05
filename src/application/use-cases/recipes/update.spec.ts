import { describe, expect, it } from 'vitest';
import { makeRecipe } from '@test/factories/recipe-factory';
import { UpdateRecipe } from './update';

describe('Updating recipe use-case', () => {
  it('should be able updating recipe', async () => {
    const repository = makeRecipe();
    const update = new UpdateRecipe(repository);
    const recipe = repository.ListRecipes[0];

    const result = await update.execute('1', {
      title: 'receita',
      describe: 'describe',
      valuePartial: 20,
    });

    expect(result.valuePartial).toBe(20);
  });
});
