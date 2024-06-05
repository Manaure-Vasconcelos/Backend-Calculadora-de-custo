import { describe, expect, it } from 'vitest';
import { CreateRecipe } from './create';
import { makeRecipe } from '@test/factories/recipe-factory';

describe('Create recipe use-case', () => {
  it('should be able creating recipe', async () => {
    const repository = makeRecipe();
    const create = new CreateRecipe(repository);

    await create.execute('testId', { title: 'algo' });

    expect(repository.ListRecipes.length).toBe(2);
  });
});
