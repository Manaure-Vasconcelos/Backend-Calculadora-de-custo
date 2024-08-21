import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesWithIngredients } from '../recipes/get-with-props';
import { AdditionalRepository } from '@application/repositories/additional-repository';
import { EntityFactory } from '@helpers/EntitiesFactory';

@Injectable()
export class DeleteAdditional {
  constructor(
    private additional: AdditionalRepository,
    private getRecipe: RecipesWithIngredients,
  ) {}

  async execute(additionalId: string, recipeId: string): Promise<void> {
    const returnDb = await this.getRecipe.execute(+recipeId);

    if (!returnDb) throw new NotFoundException();

    const recipe = EntityFactory.deleteAdditional(
      +additionalId,
      +recipeId,
      returnDb,
    );

    const newExpenses = EntityFactory.createExpensesEntity(
      +recipeId,
      returnDb,
      recipe.valuePartial,
      recipe.additional,
    );

    await this.additional.delete(+additionalId, recipe, newExpenses);
  }
}
