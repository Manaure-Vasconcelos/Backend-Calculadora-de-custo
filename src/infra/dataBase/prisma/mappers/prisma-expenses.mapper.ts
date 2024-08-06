import { ExpensesEntity } from '@application/entities/expenses.entity';

export class PrismaExpensesMapper {
  static toPrisma(expenses: ExpensesEntity) {
    return {
      serving: expenses.serving,
      pack: expenses.pack,
      profit: expenses.profit,
      valueTotal: expenses.valueTotal,
      valueUnit: expenses.valueUnit,
      recipeId: expenses.recipeId,
    };
  }
  static toDomain(raw: any, valuePartial?: number) {
    const expenses = new ExpensesEntity({
      valuePartial: valuePartial || 0,
      serving: raw.serving,
      pack: raw.pack,
      profit: raw.profit,
      recipeId: raw.recipeId,
    });
    expenses.calculateValueTotal();
    return expenses;
  }
}
