import { describe, expect, it } from 'vitest';
import { UpdatingValuePartial } from './update-value-partial';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';

describe('Updating value partial recipe use-case', () => {
  it('should be able updating value recipe', async () => {
    const updateValue = new UpdatingValuePartial(mockRecipesRepository);

    await updateValue.execute(1);

    expect(mockRecipesRepository.update).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ valuePartial: 15 }),
    );
  });
});
