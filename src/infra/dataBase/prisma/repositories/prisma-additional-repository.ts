import {
  AdditionalRepository,
  PropsAdditional,
} from '@application/repositories/additional-repository';
import { Injectable } from '@nestjs/common';
import { ReturnToDomain } from '../mappers/prisma-ingredient-mapper';
import { PrismaAdditionalMapper } from '../mappers/prisma-additional-mapper';
import { PrismaService } from '../prisma.service';
import { ReturnGetRecipe } from '../mappers/prisma-recipe-mapper';
import { ExpensesEntity } from '@application/entities/expenses.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';

@Injectable()
export class PrismaAdditionalRepository implements AdditionalRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    additional,
    valueUnit,
    valueTotal,
  }: PropsAdditional): Promise<ReturnGetRecipe> {
    const raw = PrismaAdditionalMapper.toPrisma(additional);
    const res = await this.prisma.recipes.update({
      where: { id: additional.recipeId },
      data: {
        additional: {
          create: {
            name: raw.name,
            marketPrice: raw.marketPrice,
            grossWeight: raw.grossWeight,
            usedWeight: raw.usedWeight,
            realAmount: raw.realAmount,
          },
        },
        expenses: {
          update: {
            data: { valueUnit: valueUnit, valueTotal: valueTotal },
          },
        },
      },
      include: { ingredients: true, expenses: true, additional: true },
    });
    return PrismaAdditionalMapper.toDomain(res);
  }

  async save({
    additional,
    valueUnit,
    valueTotal,
  }: PropsAdditional): Promise<ReturnToDomain> {
    const raw = PrismaAdditionalMapper.toPrisma(additional);
    const res = await this.prisma.recipes.update({
      where: { id: additional.recipeId },
      data: {
        additional: {
          update: {
            where: { id: additional.id },
            data: {
              name: raw.name,
              marketPrice: raw.marketPrice,
              grossWeight: raw.grossWeight,
              usedWeight: raw.usedWeight,
              realAmount: raw.realAmount,
            },
          },
        },
        expenses: {
          update: {
            data: { valueUnit: valueUnit, valueTotal: valueTotal },
          },
        },
      },
      include: { ingredients: true, expenses: true, additional: true },
    });
    return PrismaAdditionalMapper.toDomain(res);
  }

  async delete(
    additionalId: number,
    recipe: RecipeEntity,
    expenses: ExpensesEntity,
  ): Promise<void> {
    await this.prisma.recipes.update({
      where: { id: recipe.id },
      data: {
        additional: { delete: { id: additionalId } },
        expenses: {
          update: {
            data: {
              valueUnit: expenses.valueUnit,
              valueTotal: expenses.valueTotal,
            },
          },
        },
      },
    });
  }
}
