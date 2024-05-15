import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { recipeUpdatingRequest } from 'src/common/interfaces/recipeUpdadeRequest';

export abstract class RecipesRepository {
  abstract create(userId: number, receivedValues: RecipeRequest): Promise<any>;
  abstract allRecipesFromUser(receivedId: number): Promise<any>;
  abstract getRecipe(receivedId: number): Promise<any>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(
    receivedId: number,
    recipeUpdate: recipeUpdatingRequest,
  ): Promise<any>;
}
