import { RecipeEntity } from '@application/entities/recipe.entity';

export const mockRecipesRepository = {
  create: vi.fn().mockResolvedValue(
    new RecipeEntity({
      id: 1,
      title: 'Test Recipe',
      describe: 'Test Description',
      userId: 'user123',
      createAt: new Date(),
      updateAt: null,
      valuePartial: 0,
    }),
  ),
  allRecipesFromUser: vi.fn(),
  getRecipe: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};
