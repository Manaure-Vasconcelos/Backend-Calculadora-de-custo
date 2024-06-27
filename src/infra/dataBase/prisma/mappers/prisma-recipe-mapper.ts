import { RecipeEntity } from '@application/entities/recipe.entity';

interface RawProps {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
  ingredients?: any[];
  valuePartial: number | null;
  createdAt: Date;
  updatedAt: Date;
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
      valuePartial: raw.valuePartial,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
