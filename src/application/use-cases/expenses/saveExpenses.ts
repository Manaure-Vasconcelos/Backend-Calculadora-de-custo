import { ExpensesEntity } from '@application/entities/expenses.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetExpenses } from './getExpenses';
import { ExpensesRepository } from '@application/repositories/expenses-repository';

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
      const oldExpenses = await this.get.execute(recipeId);

      if (!oldExpenses) throw new NotFoundException('Expenses not existing');

      const newExpenses = new ExpensesEntity({
        valuePartial: valuePartial || 0,
        serving: serving || oldExpenses.serving,
        pack: pack || oldExpenses.pack,
        profit: profit || oldExpenses.profit,
        recipeId: recipeId,
      });

      newExpenses.calculateValueTotal();

      return await this.expenses.save(newExpenses);
    } catch (error) {
      throw new BadRequestException('not save success');
    }
  }
}
