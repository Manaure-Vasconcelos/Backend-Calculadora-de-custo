import { Injectable } from '@nestjs/common';
import { IngredientProtocol } from '../interfaces/ingredient-protocol';

@Injectable()
export class IngredientService implements IngredientProtocol {
  constructor(
    public describe: string = 'Comida 1',
    public marketWeight: number = 6,
    public marketPrice: number = 10,
    public grossWeight: number = 5,
    public _realAmount?: number,
  ) {}

  setRealAmount(): void {
    this._realAmount =
      (this.marketPrice * this.grossWeight) / this.marketWeight;
  }
  /*   totalAmountPerIngredient(ingredient: IngredientProtocol): number {
    return (
      (ingredient.marketPrice * ingredient.grossWeight) /
      ingredient.marketWeight
    );
  } */
}
