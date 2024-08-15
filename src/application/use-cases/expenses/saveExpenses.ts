import { ExpensesEntity } from '@application/entities/expenses.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetExpenses } from './getExpenses';
import { ExpensesRepository } from '@application/repositories/expenses-repository';
import { RecipesRepository } from '@application/repositories/recipes-repository';

interface SaveProps {
  valuePartial?: number;
  serving?: number;
  pack?: number;
  profit?: number;
  recipeId: number;
}

@Injectable()
export class SaveExpenses {
  constructor(
    private get: GetExpenses,
    private recipesRepository: RecipesRepository,
    private expenses: ExpensesRepository,
  ) {}

  async execute({
    valuePartial,
    serving,
    pack,
    profit,
    recipeId,
  }: SaveProps): Promise<ExpensesEntity> {
    try {
      const returnDb = await this.recipesRepository.getRecipeProps(+recipeId);

      if (!returnDb) throw new NotFoundException();

      const newExpenses = new ExpensesEntity({
        valuePartial: valuePartial || 0,
        serving: serving || returnDb.expenses.serving,
        pack: pack || returnDb.expenses.pack,
        profit: profit || returnDb.expenses.profit,
        recipeId: recipeId,
      });

      newExpenses.calculateValueUnit(returnDb.recipe.additional);
      newExpenses.calculateValueTotal();

      return await this.expenses.save(newExpenses);
    } catch (error) {
      throw new BadRequestException('not save success');
    }
  }
}
