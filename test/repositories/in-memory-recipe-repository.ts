import { recipeUpdatingRequest } from '@common/interfaces/recipeUpdadeRequest';

export class InMemoryRecipesRepository {
  public ListRecipes: any[] = [
    {
      id: 1,
      title: 'receita',
      describe: 'describe',
      userId: 'userId',
      createAt: new Date(),
      valuePartial: 10,
      ingredients: [],
    },
  ];

  async create(recipe: any): Promise<any> {
    this.ListRecipes.push(recipe);
  }
  async allRecipesFromUser(receivedId: string): Promise<any> {
    return [
      {
        id: 1,
        title: 'receita',
        describe: 'describe',
        userId: 'userId',
        createAt: new Date(),
        valuePartial: 10,
      },
      {
        id: 2,
        title: 'receita',
        describe: 'describe',
        userId: 'userId',
        createAt: new Date(),
        valuePartial: 10,
      },
      {
        id: 3,
        title: 'receita',
        describe: 'describe',
        userId: 'userId',
        createAt: new Date(),
        valuePartial: 10,
      },
    ];
  }
  async getRecipe(receivedId: number): Promise<any> {
    return this.ListRecipes.find((recipe) => recipe.id === receivedId);
  }
  async delete(receivedId: number): Promise<any> {
    this.ListRecipes.pop();
  }
  async update(receivedId: number, recipeUpdate: any): Promise<any> {
    const userIndex = this.ListRecipes.findIndex(
      (item) => item.id === receivedId,
    );

    this.ListRecipes[userIndex] = recipeUpdate;
    return this.ListRecipes[userIndex];
  }
}
