import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { RecipesDTO } from 'src/infra/http/DTOs/recipe-dto';

export abstract class RecipesRepository {
  abstract create(receivedValues: RecipeRequest): Promise<any>;
  abstract allRecipesFromUser(receivedId: number): Promise<any>;
  abstract getRecipe(receivedId: number): Promise<any>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(receivedId: number, recipeUpdate: RecipesDTO): Promise<any>;
}
