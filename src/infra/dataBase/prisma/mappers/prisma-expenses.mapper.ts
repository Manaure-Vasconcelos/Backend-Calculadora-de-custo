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
  static toDomain(raw: any) {
    return new ExpensesEntity({
      valuePartial: raw.valuePartial,
      serving: raw.serving,
      pack: raw.pack,
      profit: raw.profit,
      recipeId: raw.recipeId,
    });
  }
}
