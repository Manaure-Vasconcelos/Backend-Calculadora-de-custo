import { IngredientEntity } from '@application/entities/ingredient.entity';

export abstract class IngredientsRepository {
  abstract create(ingredient: IngredientEntity): Promise<IngredientEntity>;
  abstract singleIngredient(
    receivedId: number,
  ): Promise<IngredientEntity | null>;
  abstract delete(receivedId: number): Promise<any>;
  abstract save(ingredient: IngredientEntity): Promise<IngredientEntity>;
}
