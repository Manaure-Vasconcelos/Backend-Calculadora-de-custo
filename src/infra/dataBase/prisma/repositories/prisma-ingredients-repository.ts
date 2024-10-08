import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreatedProps,
  IngredientsRepository,
} from '@application/repositories/ingredients-repository';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import {
  PrismaIngredientMapper,
  ReturnToDomain,
} from '../mappers/prisma-ingredient-mapper';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';

@Injectable()
export class PrismaIngredientsRepository implements IngredientsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    ingredient,
    valuePartial,
    valueUnit,
    valueTotal,
  }: CreatedProps): Promise<ReturnToDomain> {
    const raw = PrismaIngredientMapper.toPrisma(ingredient);
    const created = await this.prisma.recipes.update({
      where: { id: raw.recipeId },
      data: {
        valuePartial: valuePartial,
        ingredients: {
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
    return PrismaIngredientMapper.toDomainRecipeIngredient(created);
  }

  async save({
    ingredient,
    valuePartial,
    valueUnit,
    valueTotal,
  }: CreatedProps): Promise<ReturnToDomain> {
    const raw = PrismaIngredientMapper.toSave(ingredient);

    const updatedIngredient = await this.prisma.recipes.update({
      where: { id: ingredient.recipeId },
      data: {
        valuePartial: valuePartial,
        ingredients: { update: { where: { id: ingredient.id }, data: raw } },
        expenses: {
          update: {
            data: { valueUnit: valueUnit, valueTotal: valueTotal },
          },
        },
      },
      include: { ingredients: true, expenses: true, additional: true },
    });
    return PrismaIngredientMapper.toDomainRecipeIngredient(updatedIngredient);
  }

  async singleIngredient(receivedId: number): Promise<IngredientEntity | null> {
    const ingredientFound = await this.prisma.ingredient.findFirst({
      where: { id: receivedId },
    });
    if (!ingredientFound) return null;

    return PrismaIngredientMapper.toDomain(ingredientFound);
  }

  async delete(
    itemId: number,
    recipe: RecipeEntity,
    expenses: ExpensesEntity,
  ): Promise<void> {
    await this.prisma.recipes.update({
      where: { id: recipe.id },
      data: {
        valuePartial: recipe.valuePartial,
        ingredients: { delete: { id: itemId } },
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
