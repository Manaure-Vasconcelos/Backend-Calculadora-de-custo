import { IngredientEntity } from '@application/entities/ingredient.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';

export interface CreatedProps {
  ingredient: IngredientEntity;
  valuePartial: number;
  valueUnit: number;
  valueTotal: number;
}

export abstract class IngredientsRepository {
  abstract create({
    ingredient,
    valuePartial,
    valueUnit,
    valueTotal,
  }: CreatedProps): Promise<ReturnToDomain>;
  abstract singleIngredient(
    receivedId: number,
  ): Promise<IngredientEntity | null>;
  abstract delete(receivedId: number): Promise<any>;
  abstract save(ingredient: IngredientEntity): Promise<IngredientEntity>;
}
