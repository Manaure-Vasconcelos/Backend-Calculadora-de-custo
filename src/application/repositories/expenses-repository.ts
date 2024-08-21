import { ExpensesEntity } from '@application/entities/expenses.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';

export abstract class ExpensesRepository {
  abstract get(id: number): Promise<ExpensesEntity>;
  abstract save(expenses: ExpensesEntity): Promise<ReturnToDomain>;
}
