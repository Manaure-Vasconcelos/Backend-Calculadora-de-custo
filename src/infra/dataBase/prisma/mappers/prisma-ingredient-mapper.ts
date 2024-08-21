import { ExpensesEntity } from '@application/entities/expenses.entity';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';

interface RawProps {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

interface RawRecipeIngredient {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
  valuePartial: number | null;
  createdAt: Date;
  updatedAt: Date;
  ingredients: any[];
  expenses: {
    id: number;
    serving: number;
    pack: number;
    profit: number;
    valueTotal: number;
    valueUnit: number;
    recipeId: number;
  } | null;
  additional: RawProps[] | null;
}

export interface ReturnToDomain {
  recipe: RecipeEntity;
  expenses: ExpensesEntity;
}

export class PrismaIngredientMapper {
  static toPrisma(item: IngredientEntity) {
    return {
      name: item.name,
      usedWeight: item.usedWeight,
      grossWeight: item.grossWeight,
      marketPrice: item.marketPrice,
      realAmount: item.realAmount,
      recipeId: item.recipeId,
    };
  }

  static toSave(raw: RawProps) {
    return {
      name: raw.name === 'default' ? undefined : raw.name,
      usedWeight: raw.usedWeight,
      grossWeight: raw.grossWeight,
      marketPrice: raw.marketPrice,
      realAmount: raw.realAmount,
    };
  }

  static toDomainRecipeIngredient(raw: RawRecipeIngredient): ReturnToDomain {
    const recipe = new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      ingredients: raw.ingredients,
      additional: raw.additional ?? [],
      createdAt: raw.createdAt,
    });

    const expenses = new ExpensesEntity({
      valuePartial: raw.valuePartial || 0,
      serving: raw.expenses?.serving || 0,
      pack: raw.expenses?.pack || 0,
      profit: raw.expenses?.profit || 0,
      valueTotal: raw.expenses?.valueTotal,
      valueUnit: raw.expenses?.valueUnit,
      recipeId: 46,
    });

    recipe.additional?.length !== 0
      ? expenses.calculateValueUnit(recipe.additional)
      : expenses.calculateValueUnit();

    expenses.calculateValueTotal();

    return { recipe, expenses };
  }

  static toDomain(raw: RawProps): IngredientEntity {
    return new IngredientEntity({
      id: raw.id,
      recipeId: raw.recipeId,
      name: raw.name,
      marketPrice: raw.marketPrice,
      grossWeight: raw.grossWeight,
      usedWeight: raw.usedWeight,
      realAmount: raw.realAmount,
    });
  }
}
