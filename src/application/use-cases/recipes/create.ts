import { RecipeEntity } from '@application/entities/recipe.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { ExpensesEntity } from '@application/entities/expenses.entity';

export interface RecipeRequest {
  userId: string;
  title: string;
  describe?: string;
}

@Injectable()
export class CreateRecipe {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedValues: RecipeRequest): Promise<RecipeEntity> {
    const recipe = new RecipeEntity({
      userId: receivedValues.userId,
      title: receivedValues.title,
      describe: receivedValues.describe,
    });

    if (!recipe) throw new ConflictException();

    const newExpenses = new ExpensesEntity({
      valuePartial: 0,
      serving: 0,
      pack: 0,
      profit: 30,
      recipeId: 0,
    });

    newExpenses.calculateValueTotal();

    const res = await this.recipesRepository.create(recipe, newExpenses);

    if (!res) throw new BadRequestException();

    return res;
  }
}
