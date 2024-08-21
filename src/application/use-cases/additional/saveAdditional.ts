import { AdditionalRepository } from '@application/repositories/additional-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';
import { RecipesWithIngredients } from '../recipes/get-with-props';
import { EntityFactory } from '@helpers/EntitiesFactory';

interface AdditionalUpdateProps {
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
  recipeId: number;
}

@Injectable()
export class SaveAdditional {
  constructor(
    private additional: AdditionalRepository,
    private getRecipe: RecipesWithIngredients,
  ) {}

  async execute(
    additionalId: string,
    receivedValues: AdditionalUpdateProps,
  ): Promise<ReturnGetRecipe> {
    const returnDb = await this.getRecipe.execute(receivedValues.recipeId);

    if (!returnDb) throw new NotFoundException();

    const additional = EntityFactory.createAdditional(
      receivedValues.recipeId,
      receivedValues,
      +additionalId,
    );

    const recipe = EntityFactory.createRecipeEntity(+additionalId, returnDb);

    recipe.additional.forEach((item, index) => {
      if (item.id === additional.id) {
        recipe.additional[index] = additional;
      }
    });

    const expenses = EntityFactory.createExpensesEntity(
      receivedValues.recipeId,
      returnDb,
      undefined,
      recipe.additional,
    );

    return await this.additional.save({
      additional,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    });
  }
}
