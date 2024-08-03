import { ExpensesEntity } from '@application/entities/expenses.entity';

export abstract class ExpensesRepository {
  abstract get(id: number): Promise<ExpensesEntity>;
  abstract save(expenses: ExpensesEntity): Promise<ExpensesEntity>;
}
