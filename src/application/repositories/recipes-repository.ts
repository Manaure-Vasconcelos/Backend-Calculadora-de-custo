import { ExpensesEntity } from '@application/entities/expenses.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

export abstract class RecipesRepository {
  abstract create(
    recipe: RecipeEntity,
    expenses: ExpensesEntity,
  ): Promise<RecipeEntity | null>;
  abstract allRecipesFromUser(receivedId: string): Promise<ReturnGetRecipe[]>;
  abstract getRecipe(receivedId: number): Promise<RecipeEntity | null>;
  abstract getRecipeProps(receivedId: number): Promise<ReturnGetRecipe | null>;
  abstract delete(receivedId: number): Promise<void>;
  abstract update(values: RecipeEntity): Promise<RecipeEntity>;
}
