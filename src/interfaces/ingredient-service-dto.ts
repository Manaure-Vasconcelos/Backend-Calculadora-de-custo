export abstract class IngredientDTO {
  describe: string;
  marketWeight: number;
  marketPrice: number;
  grossWeight: number;
  _realAmount?: number;
}
