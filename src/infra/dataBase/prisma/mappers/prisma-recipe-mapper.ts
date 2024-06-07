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
      id: recipe.id,
      title: typeof recipe.title === 'undefined' ? 'Receita' : recipe.title,
      describe: recipe.describe,
      userId: recipe.userId,
      createdAt: recipe.createAt,
      valuePartial: recipe.valuePartial,
    };
  }

  static toUpdate(recipe: RecipeEntity) {
    return {
      id: recipe.id,
      title: recipe.title === 'Receita' ? undefined : recipe.title,
      describe: recipe.describe,
      userId: recipe.userId === 'FakeId' ? undefined : recipe.userId,
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
      ingredients: raw.ingredients ? raw.ingredients : [],
      valuePartial: raw.valuePartial,
      createAt: raw.createdAt,
      updateAt: raw.updatedAt,
    });
  }
}
