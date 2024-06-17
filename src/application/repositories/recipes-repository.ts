import { RecipeEntity } from '@application/entities/recipe.entity';

export abstract class RecipesRepository {
  abstract create(recipe: RecipeEntity): Promise<RecipeEntity | null>;
  abstract allRecipesFromUser(receivedId: string): Promise<RecipeEntity[]>;
  abstract getRecipe(receivedId: number): Promise<RecipeEntity | null>;
  abstract delete(receivedId: number): Promise<void>;
  abstract update(values: RecipeEntity): Promise<void>;
}
