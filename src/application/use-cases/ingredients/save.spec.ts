import { mockIngredientRepository } from '@test/mocks/ingredient-mock';
import { SaveIngredient } from './save';
import { mockUpdateValuePartial } from '@test/mocks/recipe-mock';
import { IngredientEntity } from '@application/entities/ingredient.entity';

describe('Save ingredient use-case', () => {
  let saveIngredient: SaveIngredient;

  beforeEach(() => {
    saveIngredient = new SaveIngredient(
      mockIngredientRepository,
      mockUpdateValuePartial,
    );
  });

  it('should be able create ingredient', async () => {
    const ingredient = await saveIngredient.execute('1', {
      name: 'ingredient',
      usedWeight: 10,
      marketPrice: 5,
      grossWeight: 2,
    });

    expect(mockIngredientRepository.save).toHaveBeenCalledWith(
      expect.any(IngredientEntity),
    );
    expect(ingredient).toBeInstanceOf(IngredientEntity);
  });
});
