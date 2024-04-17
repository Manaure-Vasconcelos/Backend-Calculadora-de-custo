export abstract class IngredientServiceDTO {
  describe: string;
  marketWeight: number;
  marketPrice: number;
  grossWeight: number;
  _realAmount?: number;
  setRealAmount(): void {}
}
