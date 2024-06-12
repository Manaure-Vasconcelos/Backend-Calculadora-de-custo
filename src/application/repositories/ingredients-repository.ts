import { IngredientEntity } from '@application/entities/ingredient.entity';
import { IngredientResponse } from 'src/common/interfaces/ingredientResponse';

export abstract class IngredientsRepository {
  abstract create(ingredient: IngredientEntity): Promise<IngredientEntity>;
  abstract singleIngredient(
    receivedId: number,
  ): Promise<IngredientResponse | null>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(ingredient: IngredientEntity): Promise<IngredientEntity>;
}
