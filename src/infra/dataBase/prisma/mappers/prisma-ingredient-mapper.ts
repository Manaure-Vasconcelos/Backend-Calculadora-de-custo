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
}

export interface ReturnToDomain {
  newRecipe: RecipeEntity;
  newExpenses: ExpensesEntity;
}

export class PrismaIngredientMapper {
  static toPrisma(recipe: IngredientEntity) {
    return {
      name: recipe.name,
      usedWeight: recipe.usedWeight,
      grossWeight: recipe.grossWeight,
      marketPrice: recipe.marketPrice,
      realAmount: recipe.realAmount,
      recipeId: recipe.recipeId,
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
    const newRecipe = new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      ingredients: raw.ingredients,
      createdAt: raw.createdAt,
    });

    const newExpenses = new ExpensesEntity({
      valuePartial: raw.valuePartial || 0,
      serving: raw.expenses?.serving || 0,
      pack: raw.expenses?.pack || 0,
      profit: raw.expenses?.profit || 0,
      valueTotal: raw.expenses?.valueTotal,
      valueUnit: raw.expenses?.valueUnit,
      recipeId: 46,
    });

    newExpenses.calculateValueTotal();

    return { newRecipe, newExpenses };
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
