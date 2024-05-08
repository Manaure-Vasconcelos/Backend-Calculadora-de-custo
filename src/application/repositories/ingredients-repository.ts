import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';
import { IngredientResponse } from 'src/common/interfaces/ingredientResponse';

export abstract class IngredientsRepository {
  abstract create(
    receivedValues: IngredientRequest,
    realAmount: number,
  ): Promise<any>;
  abstract singleIngredient(receivedId: number): Promise<IngredientResponse>;
  abstract delete(receivedId: number): Promise<any>;
  abstract update(
    receivedValues: IngredientRequest,
    receivedId: number,
    newRealAmount: number,
  ): Promise<any>;
}
