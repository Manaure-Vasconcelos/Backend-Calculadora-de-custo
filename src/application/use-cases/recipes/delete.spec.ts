import { describe, expect, it } from 'vitest';
import { DeleteRecipe } from './delete';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';

describe('Delete recipe use-case', () => {
  it('should be able deleting recipe', async () => {
    const deleteRecipe = new DeleteRecipe(mockRecipesRepository);

    const validId = '1';

    expect(await deleteRecipe.execute(validId)).toBeUndefined();

    expect(mockRecipesRepository.delete).toHaveBeenCalledWith(+validId);
  });
});
