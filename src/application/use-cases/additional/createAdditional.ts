import { AdditionalRepository } from '@application/repositories/additional-repository';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { EntityFactory } from '@helpers/EntitiesFactory';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface AdditionalProps {
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
}

@Injectable()
export class CreateAdditional {
  constructor(
    private additional: AdditionalRepository,
    private recipesRepository: RecipesRepository,
  ) {}

  async execute(
    recipeId: string,
    receivedValues: AdditionalProps,
  ): Promise<ReturnGetRecipe> {
    const returnDb = await this.recipesRepository.getRecipeProps(+recipeId);

    if (!returnDb) throw new NotFoundException();

    const additional = EntityFactory.createAdditional(
      +recipeId,
      receivedValues,
    );

    const recipe = EntityFactory.createRecipeEntity(+recipeId, returnDb);

    recipe.additional.push(additional);

    const expenses = EntityFactory.createExpensesEntity(
      +recipeId,
      returnDb,
      undefined,
      recipe.additional,
    );

    return await this.additional.create({
      additional,
      valueUnit: expenses.valueUnit,
      valueTotal: expenses.valueTotal,
    });
  }
}