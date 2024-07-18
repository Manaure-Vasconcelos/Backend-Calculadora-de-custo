import { describe, it, expect } from 'vitest';
import { CreateIngredient } from './create';
import { mockIngredientRepository } from '@test/mocks/ingredient-mock';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import { mockUpdateValuePartial } from '@test/mocks/recipe-mock';

describe('Create ingredient use-case', () => {
  let createIngredient: CreateIngredient;

  beforeEach(() => {
    createIngredient = new CreateIngredient(
      mockIngredientRepository,
      mockUpdateValuePartial,
    );
  });

  it('should be able create ingredient', async () => {
    const ingredient = await createIngredient.execute('1', {
      name: 'ingredient',
      usedWeight: 10,
      marketPrice: 5,
      grossWeight: 2,
    });

    expect(mockIngredientRepository.create).toHaveBeenCalledWith(
      expect.any(IngredientEntity),
    );
    expect(ingredient).toBeInstanceOf(IngredientEntity);
  });
});
