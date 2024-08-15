import { ExpensesEntity } from '@application/entities/expenses.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';

interface RawProps {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
  ingredients?: any[];
  additional?: any[];
  valuePartial: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface RawPropsGet extends RawProps {
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

export interface ReturnGetRecipe {
  recipe: RecipeEntity;
  expenses: ExpensesEntity;
}

export class PrismaRecipeMapper {
  static toPrisma(recipe: RecipeEntity) {
    return {
      title: recipe.title,
      describe: recipe.describe,
      userId: recipe.userId,
      createdAt: recipe.createdAt,
      valuePartial: recipe.valuePartial,
    };
  }

  static toUpdate(recipe: RecipeEntity) {
    return {
      id: recipe.id,
      title: recipe.title,
      describe: recipe.describe,
      userId: recipe.userId,
      valuePartial: recipe.valuePartial,
    };
  }

  static toDomain(raw: RawProps): RecipeEntity {
    return new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      ingredients: raw.ingredients ? raw.ingredients : [],
      valuePartial: raw.valuePartial ?? 0,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toDomainGet(raw: RawPropsGet): ReturnGetRecipe {
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
