import { ExpensesEntity } from '@application/entities/expenses.entity';

export class ExpensesViewModel {
  static toHTTP(expenses: ExpensesEntity) {
    return {
      valuePartial: expenses.valuePartial,
      serving: expenses.serving,
      pack: expenses.pack,
      profit: expenses.profit,
      valueTotal: expenses.valueTotal,
      valueUnit: expenses.valueUnit,
      recipeId: expenses.recipeId,
    };
  }
}
