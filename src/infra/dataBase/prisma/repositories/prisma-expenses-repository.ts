import { ExpensesEntity } from '@application/entities/expenses.entity';
import { ExpensesRepository } from '@application/repositories/expenses-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaExpensesMapper } from '../mappers/prisma-expenses.mapper';
import {
  PrismaIngredientMapper,
  ReturnToDomain,
} from '../mappers/prisma-ingredient-mapper';

@Injectable()
export class PrismaExpensesRepository implements ExpensesRepository {
  constructor(private prisma: PrismaService) {}

  async get(recipeId: number): Promise<ExpensesEntity> {
    const res = await this.prisma.expenses.findUnique({
      where: { recipeId: recipeId },
    });
    return PrismaExpensesMapper.toDomain(res);
  }

  async save(expenses: ExpensesEntity): Promise<ReturnToDomain> {
    const raw = PrismaExpensesMapper.toPrisma(expenses);

    const res = await this.prisma.recipes.update({
      where: { id: raw.recipeId },
      data: {
        expenses: {
          update: {
            data: {
              serving: raw.serving,
              pack: raw.pack,
              profit: raw.profit,
              valueUnit: raw.valueUnit,
              valueTotal: raw.valueTotal,
            },
          },
        },
      },
      include: { ingredients: true, expenses: true, additional: true },
    });
    return PrismaIngredientMapper.toDomainRecipeIngredient(res);
  }
}
