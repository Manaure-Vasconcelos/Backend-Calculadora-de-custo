import { expect, it } from 'vitest';
import { CreateRecipe } from './create';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';

it('should create a recipe with all required fields', async () => {
  const createRecipe = new CreateRecipe(mockRecipesRepository);

  const recipeRequest = {
    userId: 'user123',
    title: 'Test Recipe',
    describe: 'Test Description',
  };

  const result = await createRecipe.execute(recipeRequest);

  expect(mockRecipesRepository.create).toHaveBeenCalledWith(
    expect.any(RecipeEntity),
  );
  expect(result).toBeInstanceOf(RecipeEntity);
  expect(result.title).toBe('Test Recipe');
  expect(result.describe).toBe('Test Description');
  expect(result.userId).toBe('user123');
});
