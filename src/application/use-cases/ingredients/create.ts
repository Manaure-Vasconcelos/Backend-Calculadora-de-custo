import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';
import { EntityFactory } from './../../../helpers/EntitiesFactory';
import { RecipesWithIngredients } from '../recipes/get-with-props';

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
    private getRecipe: RecipesWithIngredients,
  ) {}

  async execute(
    recipeId: string,
    receivedValues: IngredientRequest,
  ): Promise<ReturnToDomain> {
    const returnDb = await this.getRecipe.execute(+recipeId);

    if (!returnDb) throw new NotFoundException();

    const ingredient = EntityFactory.createIngredientEntity(
      +recipeId,
      receivedValues,
    );

    const recipe = EntityFactory.createRecipeEntity(
      +recipeId,
      returnDb,
      ingredient,
    );

    const expenses = EntityFactory.createExpensesEntity(
      +recipeId,
      returnDb,
      recipe.valuePartial,
      recipe.additional,
    );

    return await this.ingredientsRepository.create({
      ingredient,
      valuePartial: recipe.valuePartial || 0,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    });
  }
}
