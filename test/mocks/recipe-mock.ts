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
  allRecipesFromUser: vi
    .fn()
    .mockResolvedValue([
      new RecipeEntity({ id: 1, title: 'Recipe 1', userId: 'user1' }),
      new RecipeEntity({ id: 2, title: 'Recipe 2', userId: 'user1' }),
      new RecipeEntity({ id: 3, title: 'Recipe 3', userId: 'user1' }),
    ]),
  getRecipe: vi.fn(),
  delete: vi.fn().mockResolvedValue(undefined),
  update: vi.fn(),
};
