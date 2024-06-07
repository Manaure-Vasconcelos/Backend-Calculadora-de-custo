import { RecipeEntity } from '@application/entities/recipe.entity';

interface RecipeRequest {
  userId: string;
  title: string;
  describe?: string;
}

export class ServiceRecipeMapper {
  static toEntity(raw: RecipeRequest): RecipeEntity {
    return new RecipeEntity({
      userId: raw.userId,
      title: raw.title,
      describe: raw.describe,
    });
  }

  /*   static toUpdatingEntity(
    raw: Replace<RecipeRequest, { userId?: string }>,
  ): RecipeEntity {
    return new RecipeEntity({
      id: +raw.recipeId ?? 1,
      userId: raw.userId ?? 'fake',
      title: raw.title,
      describe: raw.describe,
    });
  } */
}
