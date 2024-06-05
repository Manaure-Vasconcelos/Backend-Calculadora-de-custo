import { RecipeEntity } from '@application/entities/recipe.entity';
import { recipeUpdatingRequest } from 'src/common/interfaces/recipeUpdadeRequest';

export abstract class RecipesRepository {
  abstract create(recipe: RecipeEntity): Promise<any>;
  abstract allRecipesFromUser(receivedId: string): Promise<any>;
  abstract getRecipe(receivedId: number): Promise<any>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(
    receivedId: number,
    recipeUpdate: recipeUpdatingRequest,
  ): Promise<any>;
}
