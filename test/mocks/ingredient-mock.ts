import { IngredientEntity } from '@application/entities/ingredient.entity';

export const mockIngredientRepository = {
  create: vi.fn().mockResolvedValue(
    new IngredientEntity({
      recipeId: 1,
      name: 'Ingredient 1',
      marketPrice: 10,
      grossWeight: 5,
      usedWeight: 2,
    }),
  ),
  singleIngredient: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};
