import { recipeUpdatingRequest } from '@common/interfaces/recipeUpdadeRequest';

export class InMemoryRecipesRepository {
  public ListRecipes: any[] = [];

  async create(recipe: any): Promise<any> {
    this.ListRecipes.push(recipe);
  }
  async allRecipesFromUser(receivedId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async getRecipe(receivedId: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async delete(receivedId: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async update(
    receivedId: number,
    recipeUpdate: recipeUpdatingRequest,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
