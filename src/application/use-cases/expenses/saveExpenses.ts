import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpensesRepository } from '@application/repositories/expenses-repository';
import { RecipesWithIngredients } from '../recipes/get-with-props';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';
import { EntityFactory } from '@helpers/EntitiesFactory';

export interface SaveExpensesProps {
  valuePartial?: number;
  serving?: number;
  pack?: number;
  profit?: number;
  recipeId: number;
}

@Injectable()
export class SaveExpenses {
  constructor(
    private getRecipe: RecipesWithIngredients,
    private expenses: ExpensesRepository,
  ) {}

  async execute(newValues: SaveExpensesProps): Promise<ReturnToDomain> {
    const returnDb = await this.getRecipe.execute(newValues.recipeId);

    if (!returnDb) throw new NotFoundException();

    const newExpenses = EntityFactory.saveExpensesEntity(newValues, returnDb);

    return await this.expenses.save(newExpenses);
  }
}
