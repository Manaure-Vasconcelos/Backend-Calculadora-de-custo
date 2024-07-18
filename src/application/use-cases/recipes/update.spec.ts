import { describe, expect, it } from 'vitest';
import { UpdateRecipe } from './update';
import { mockRecipesRepository } from '@test/mocks/recipe-mock';
import { RecipeEntity } from '@application/entities/recipe.entity';

describe('Updating recipe use-case', () => {
  it('should be able updating recipe', async () => {
    const update = new UpdateRecipe(mockRecipesRepository);

    const result = await update.execute({
      recipeId: '1',
      describe: 'describe',
    });

    expect(result.title).toBe('Receita');
    expect(result).toBeInstanceOf(RecipeEntity);
  });
});
