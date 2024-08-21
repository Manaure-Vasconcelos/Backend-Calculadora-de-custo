import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { EntityFactory } from '@helpers/EntitiesFactory';
import { RecipesWithIngredients } from '../recipes/get-with-props';

interface IngredientUpdatingRequest {
  name?: string;
  marketPrice: number;
  grossWeight: number;
  usedWeight: number;
  recipeId: number;
}

@Injectable()
export class SaveIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private getRecipe: RecipesWithIngredients,
  ) {}

  async execute(
    ingredientId: string,
    receivedValues: IngredientUpdatingRequest,
  ) {
    const returnDb = await this.getRecipe.execute(receivedValues.recipeId);

    if (!returnDb) throw new NotFoundException();

    const ingredient = EntityFactory.createIngredientEntity(
      receivedValues.recipeId,
      receivedValues,
      +ingredientId,
    );

    const recipe = EntityFactory.saveRecipeEntity(
      +receivedValues.recipeId,
      returnDb,
      ingredient,
    );

    const expenses = EntityFactory.createExpensesEntity(
      +ingredientId,
      returnDb,
      recipe.valuePartial || 0,
      recipe.additional,
    );

    const updatedIngredient = await this.ingredientsRepository.save({
      ingredient,
      valuePartial: recipe.valuePartial || 0,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    });

    return updatedIngredient;
  }
}
