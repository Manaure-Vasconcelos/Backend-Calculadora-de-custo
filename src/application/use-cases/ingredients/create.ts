import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import { UpdateRecipe } from '../recipes/update';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';

interface IngredientRequest {
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
}

@Injectable()
export class CreateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private saveRecipe: UpdateRecipe,
    private recipesRepository: RecipesRepository,
  ) {}

  async execute(
    recipeId: string,
    receivedValues: IngredientRequest,
  ): Promise<ReturnToDomain> {
    const returnDb = await this.recipesRepository.getRecipeProps(+recipeId);

    if (!returnDb) throw new NotFoundException();

    const ingredient = new IngredientEntity({
      recipeId: +recipeId,
      name: receivedValues.name,
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.usedWeight,
    });

    const recipe = new RecipeEntity({
      id: +recipeId,
      title: returnDb.recipe.title,
      describe: returnDb.recipe.describe,
      userId: returnDb.recipe.userId,
      ingredients: [...returnDb.recipe.ingredients, ingredient],
      createdAt: returnDb.recipe.createdAt,
    });

    const expenses = new ExpensesEntity({
      valuePartial: recipe.valuePartial ?? 0,
      serving: returnDb.expenses.serving,
      pack: returnDb.expenses.pack,
      profit: returnDb.expenses.profit,
      valueTotal: returnDb.expenses.valueTotal,
      valueUnit: returnDb.expenses.valueUnit,
      recipeId: 46,
    });

    expenses.calculateValueTotal();

    return await this.ingredientsRepository.create({
      ingredient,
      valuePartial: recipe.valuePartial || 0,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    });
  }
}
