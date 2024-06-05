import { RecipeEntity } from '@application/entities/recipe.entity';

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

  static toDomain(raw: any): RecipeEntity {
    return new RecipeEntity({
      id: raw.id,
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
      createAt: raw.createAt,
      valuePartial: raw.valuePartial,
    });
  }
}
