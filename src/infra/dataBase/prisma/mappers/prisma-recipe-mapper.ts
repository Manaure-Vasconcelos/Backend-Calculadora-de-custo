import { RecipeEntity } from '@application/entities/recipe.entity';

interface RawProps {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
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
      createdAt: recipe.createAt,
      valuePartial: recipe.valuePartial,
    };
  }

  static toDomain(raw: RawProps): RecipeEntity {
    return new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      createAt: raw.createdAt,
      updateAt: raw.updatedAt,
      valuePartial: raw.valuePartial,
    });
  }
}
