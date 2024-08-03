import { ExpensesEntity } from '@application/entities/expenses.entity';
import { ExpensesRepository } from '@application/repositories/expenses-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaExpensesMapper } from '../mappers/prisma-expenses.mapper';

@Injectable()
export class PrismaExpensesRepository implements ExpensesRepository {
  constructor(private prisma: PrismaService) {}

  async get(recipeId: number): Promise<ExpensesEntity> {
    const res = await this.prisma.expenses.findUnique({
      where: { recipeId: recipeId },
    });
    return PrismaExpensesMapper.toDomain(res);
  }

  async save(expenses: ExpensesEntity): Promise<ExpensesEntity> {
    const raw = PrismaExpensesMapper.toPrisma(expenses);

    const res = await this.prisma.expenses.update({
      where: { recipeId: expenses.recipeId },
      data: raw,
    });
    return PrismaExpensesMapper.toDomain(res);
  }
}
