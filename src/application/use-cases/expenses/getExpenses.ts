import { ExpensesEntity } from '@application/entities/expenses.entity';
import { ExpensesRepository } from '@application/repositories/expenses-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetExpenses {
  constructor(private expenses: ExpensesRepository) {}

  async execute(recipeId: number): Promise<ExpensesEntity> {
    const res = await this.expenses.get(recipeId);

    if (!res) throw new NotFoundException('Expenses not existing');
    return res;
  }
}
