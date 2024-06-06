import { RecipeEntity } from '@application/entities/recipe.entity';

interface RecipeRequest {
  userId: string;
  title: string;
  describe?: string;
}

export class ServiceRecipeMapper {
  static toEntity(raw: RecipeRequest): RecipeEntity {
    return new RecipeEntity({
      title: raw.title,
      describe: raw.describe,
      userId: raw.userId,
    });
  }
}
