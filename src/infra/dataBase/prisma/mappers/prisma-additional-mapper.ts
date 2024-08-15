import { AdditionalEntity } from '@application/entities/additional.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ReturnGetRecipe } from './prisma-recipe-mapper';

export class PrismaAdditionalMapper {
  static toPrisma(additional: AdditionalEntity) {
    return {
      name: additional.name,
      usedWeight: additional.usedWeight,
      grossWeight: additional.grossWeight,
      marketPrice: additional.marketPrice,
      realAmount: additional.realAmount,
      recipeId: additional.recipeId,
    };
  }

  static toDomain(raw: any): ReturnGetRecipe {
    const recipe = new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      ingredients: raw.ingredients ? raw.ingredients : [],
      additional: raw.additional ? raw.additional : [],
      valuePartial: raw.valuePartial ?? 0,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    const expenses = new ExpensesEntity({
      valuePartial: recipe.valuePartial ?? 0,
      serving: raw.expenses?.serving ?? 0,
      pack: raw.expenses?.pack ?? 0,
      profit: raw.expenses?.profit ?? 0,
      valueTotal: raw.expenses?.valueTotal,
      valueUnit: raw.expenses?.valueUnit,
      recipeId: 46,
    });

    expenses.calculateValueUnit(recipe.additional);
    expenses.calculateValueTotal();

    return { recipe, expenses };
  }
}
