import { RecipesDTO } from 'src/infra/http/DTOs/recipe-dto';

export abstract class RecipesRepository {
  abstract create(
    title: string,
    describe: string,
    userId: number,
  ): Promise<any>;
  abstract allRecipes(): Promise<any>;
  abstract getRecipe(receivedId: number): Promise<any>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(receivedId: number, recipeUpdate: RecipesDTO): Promise<any>;
}
