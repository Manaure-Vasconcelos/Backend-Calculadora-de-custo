import { Decimal } from '@prisma/client/runtime/library';

export interface IngredientResponse {
  id: number;
  name: string;
  marketWeight: Decimal;
  marketPrice: Decimal;
  grossWeight: Decimal;
  recipeId: number;
}
